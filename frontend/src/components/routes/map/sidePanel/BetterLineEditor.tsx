import ILayer from "../../../../utils/interface/ILayer";
import {useEffect, useState} from "react";
import Api, {geometry} from "../../../../api/api";
import {Spinner} from "react-bootstrap";
import IPolyline from "../../../../utils/interface/IPolyline";
import {updateOrAddLayer} from "../../../../store/features/display/displaySlice";
import {useAppDispatch} from "../../../../store/hooks";
import {IMarker} from "../../../../utils/interface/IMarker";
import {LatLngLiteral} from "leaflet";

type props = {
    layer: ILayer,
    onSaveLine: (layer: ILayer) => void
}

const randomColor = () => {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

const createPath = (way: geometry, start: string, end: string) => {
    const sortedPositions = Object
        .entries(way)
        .sort((a, b) => a[1].index-b[1].index)
        .map((pair) => {
            console.log(pair[0] + " : " + pair[1].lat + "," + pair[1].lon)
            return {lat: pair[1].lat, lng: pair[1].lon}
        })

    const startIndex =  Math.min(way[start].index, way[end].index);
    const endIndex = Math.max(way[start].index, way[end].index);

    sortedPositions.splice(endIndex + 1);
    sortedPositions.splice(0, startIndex);

    if(way[end].index < way[start].index)
        return sortedPositions.reverse();
    return sortedPositions;
}

export const BetterLineEditor = ({layer, onSaveLine}:props) => {
    const [editedLayer, setEditedLayer] = useState<ILayer>(layer);
    const [state, setState] = useState<'idle' | 'loading' | 'error'>('loading');
    const [currentNode, setCurrentNode] = useState<string>("484258490");
    const [historyPah, setHistoryPath] = useState<LatLngLiteral[]>([]);
    const dispatch = useAppDispatch();
    //const [ways, setWays] = useState()

    useEffect(() => {
        Api.explorer_node(`${currentNode}`, (node_explorer) => {
            console.log(node_explorer);
            setState('idle')

            const markers: IMarker[] = [];
            const polylines: IPolyline[] = Object
                .entries(node_explorer)
                .map((way) => {
                    const color = randomColor();
                    return {
                        positions: Object
                            .entries(way[1].geometry)
                            .sort((a, b) => a[1].index-b[1].index)
                            .map((node) => {
                                const pos = {lat: node[1].lat, lng: node[1].lon};

                                if(node[0] === currentNode)
                                    markers.push({pos: pos, color: "#ff0000", id: Number(node[0]), popupText: "You are currently here"})
                                else
                                    markers.push(
                                        {
                                            pos: pos,
                                            color: color,
                                            id: Number(node[0]),
                                            callback: () => {
                                                setHistoryPath(prevState => {
                                                    return [...prevState, ...createPath(way[1].geometry, currentNode, node[0])]
                                                })
                                                setState('loading');
                                                setCurrentNode(node[0]);
                                            }
                                        }
                                    )

                                return pos
                            }),
                        color: color,
                        weight: 5
                    }
                });


            setEditedLayer((prevState => {
                return {...prevState, markers: markers, polylines: [...polylines, {positions: historyPah, color: '#ff0000', weight: 10}]}
            }))
        });
    }, [currentNode]);

    // update the store
    useEffect(() => {
        dispatch(updateOrAddLayer(editedLayer));
    }, [dispatch, editedLayer]);

    switch (state) {
        case "idle":
            return <div>Loaded</div>
        case "loading":
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )
        case "error":
            return <div>Error</div>
    }
}