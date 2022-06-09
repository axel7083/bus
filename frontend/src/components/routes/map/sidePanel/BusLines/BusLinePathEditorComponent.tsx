import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectPosition} from "../../../../../store/features/position/positionSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert, Spinner} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {latLng} from "leaflet";
import Api, {INodeDict} from "../../../../../api/api";
import {selectBusLineById, update} from "../../../../../store/features/busLines/busLinesSlice";
import ILayer from "../../../../../utils/interface/ILayer";
import {createLayerFromIBusLine, createPath} from "./Utils";
import {IBusLine} from "../../../../../utils/interface/IBusLine";
import {IPathNode} from "../../../../../utils/interface/IPathNode";
import {IMarker} from "../../../../../utils/interface/IMarker";
import IPolyline from "../../../../../utils/interface/IPolyline";
import {updateOrAddLayer} from "../../../../../store/features/display/displaySlice";

type states = 'idle' | 'editing' | 'select-starter' | 'querying-features' | 'loading' | 'display-features' | 'error';

const BusLinePathEditorComponent = ({id, setBusy}: {id: string, setBusy: (d: boolean) => void}) => {

    // The current state
    const [state, setState] = useState<states>('idle');

    // The current busLine we are editing
    const busLine: IBusLine = useAppSelector((state) => selectBusLineById(state, id))!;

    // The layer currently edited
    const [editedLayer, setEditedLayer] = useState<ILayer>(createLayerFromIBusLine(busLine));

    // This contains all the nodes the user clicked on
    const [nodeHistory, setNodeHistory] = useState<string[]>(busLine.nodeHistory);

    // The current node we are editing
    const [currentNode, setCurrentNode] = useState<string | undefined>(undefined);

    // the latest position clicked
    const position = useAppSelector(selectPosition);

    // This contains all the nodes for the path
    // the nodes the user click on PLUS the nodes for the geometry of the roads in a sorted order.
    const [historyPath, setHistoryPath] = useState<IPathNode[]>(busLine.path);

    const dispatch = useAppDispatch();

    useEffect(() => {
        switch (state) {
            case 'display-features':
            case 'select-starter':
                setState('querying-features');
                Api.find_nodes(latLng(position), (nodes) => {
                    setState('display-features');
                    onSelectStartingPoint(nodes);
                }, () => {

                });
                return;
            default:
                return;
        }
    }, [position]);

    useEffect(() => {
        switch (state) {
            case "idle":
                setBusy(false);
                return;
            case "editing":
            case "select-starter":
            case "querying-features":
            case "loading":
            case "display-features":
            case "error":
                setBusy(true);

        }
    }, [state])

    // Called when currentNode is updated
    useEffect(() => {
        if(currentNode === undefined || state === 'idle')
            return;

        if(state !== 'loading')
            setState('loading');
        else
            return; // Do not let the user click mutliple time

        dispatch(update({
            ...busLine,
            path: historyPath,
            nodeHistory: nodeHistory
        }));

        setEditedLayer((prevState => {
            return {...prevState, markers: [], polylines: [{positions: historyPath.map((v) => v.pos), color: busLine.color, weight: 10}]}
        }));

        Api.explorer_node(`${currentNode}`, (node_explorer) => {
            console.log(node_explorer);

            // We create a list of markers
            const markers: IMarker[] = [];

            // We create a list of polylines
            const polylines: IPolyline[] = Object
                .entries(node_explorer.geometries)
                .map((way) => {
                    // For each way, we choose a random color
                    const color = "#1ea800";
                    return {
                        positions: Object
                            .entries(way[1].geometry)
                            .sort((a, b) => a[1].index-b[1].index)
                            .map((node) => {
                                const pos = {lat: node[1].lat, lng: node[1].lon};

                                if(node[0] === currentNode)
                                    markers.push({pos: pos, color: busLine.color, id: Number(node[0]), popupText: "You are currently here"})
                                else if(node_explorer.nodes_meta[node[0]].length > 1)
                                    markers.push(
                                        {
                                            pos: pos,
                                            color: color,
                                            id: Number(node[0]),
                                            callback: () => {
                                                setHistoryPath(prevState => {
                                                    return [...prevState, ...createPath(way[1].geometry, currentNode, node[0])]
                                                })
                                                setNodeHistory(prevState => {
                                                    return [...prevState, node[0]];
                                                })
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

            setState('editing');
            setEditedLayer((prevState => {
                return {...prevState, markers: markers, polylines: [...polylines, {positions: historyPath.map((v) => v.pos), color: busLine.color, weight: 10}]}
            }));
        });
    }, [currentNode]);

    // update the store
    useEffect(() => {
        dispatch(updateOrAddLayer(editedLayer));
    }, [dispatch, editedLayer]);

    const onSelectStartingPoint = (nodes: INodeDict) => {
        const markers: IMarker[] = [];
        Object.entries(nodes).map((pair) => {
            markers.push(
                {
                    pos: pair[1],
                    color: "#00fa20",
                    id: Number(pair[0]),
                    callback: () => {
                        setNodeHistory((prevState) => {
                            return [...prevState, pair[0]];
                        })
                        setCurrentNode(pair[0]);
                    }
                }
            )
        });
        setEditedLayer((prevState => {
            return {...prevState, markers: markers}
        }));
    }

    const reset = () => {
        setNodeHistory([]);
        setHistoryPath([]);
        setCurrentNode(undefined);
        setEditedLayer((prevState => {
            return {...prevState, markers: [], polylines: []}
        }));
    }

    // This function allows undoing actions
    const undo = () => {

        console.log("nodeHistory", nodeHistory);
        console.log("currentNode", currentNode);
        console.log("historyPath", historyPath)

        if(nodeHistory.length === 1)
            return;

        // Special case we only clicked once
        if(nodeHistory.length === 2) {
            const last = nodeHistory[0];
            setNodeHistory([]);
            setHistoryPath([]);
            setCurrentNode(last);
            return;
        }

        // Fetch the last item clicked by the user
        const last = nodeHistory[nodeHistory.length - 2];

        // Find it in the history path
        const pathNode = historyPath.find((value => value.id === last))
        if(pathNode === undefined)
            return; //something went wrong

        console.log("Last one pos: ", pathNode);

        // Find the index
        const index = historyPath.indexOf(pathNode);

        console.log("Last one index in historyPath: ", index);

        // Copy the history since we are going to edit it
        const nodeHistoryCopy = [...nodeHistory];
        // Remove the last one clicked by the user
        nodeHistoryCopy.splice(nodeHistory.length - 1);

        // Copy the history path
        const historyPathCopy = [...historyPath];
        // Remove all elements which has been added after the last item clicked by the user
        historyPathCopy.splice(index + 1);

        console.log("nodeHistoryCopy",nodeHistoryCopy);
        console.log("historyPathCopy",historyPathCopy);

        // Set the hooks
        setNodeHistory(nodeHistoryCopy);
        setHistoryPath(historyPathCopy);

        setCurrentNode(last);
    }

    const stopEditing = () => {
        setState('idle');
        setEditedLayer(createLayerFromIBusLine({
            ...busLine,
            path: historyPath,
            nodeHistory: nodeHistory
        }));
    }

    const startEditing = () => {
        if (busLine.nodeHistory.length > 0)
            setCurrentNode(busLine.nodeHistory[busLine.nodeHistory.length - 1]);

        setState('editing');
    }

    const computeDistance = () => {

        if(busLine.path.length === 0)
            return 0;

        if(busLine.path.length === 1)
            return 0;

        let distance = 0;
        for (let i = 0; i < busLine.path.length - 1; i++) {
            distance += latLng(busLine.path[i].pos).distanceTo(busLine.path[i +1].pos);
        }
        return distance;
    }

    const chooseComponent = () => {
        switch (state) {
            case 'querying-features':
                return (
                    <Row style={{display: "flex", alignItems: "center"}} className={"mt-2"}>
                        <Col md="auto">
                            <Spinner animation="grow" role="status">
                                <span className="visually-hidden">Waiting...</span>
                            </Spinner>
                        </Col>
                        <Col>
                            Fetching interesting elements
                        </Col>
                    </Row>
                )
            case 'select-starter':
                return (
                    <Row style={{display: "flex", alignItems: "center"}} className={"mt-2"}>
                        <Col>
                            Click on the map to display places where you can start
                        </Col>
                    </Row>
                );
            case 'display-features':
                return (
                    <Row>
                        <Col>
                            Select a marker to choose the bus starting point
                        </Col>
                    </Row>
                )
            case 'idle':
                return (
                    <Row>
                        <Col>
                            <Button onClick={(e) => startEditing()}>Start editing</Button>
                        </Col>
                    </Row>
                )
            case 'editing':
                if(currentNode === undefined)
                    return (
                        <Row>
                            <Col>
                                <Button onClick={(e)=> {
                                    setState('select-starter')
                                }}>Choose a starter position</Button>
                            </Col>
                        </Row>
                    )
                else if(nodeHistory.length > 0)
                    return (
                        <>
                            <Row>
                                <Col>
                                    Current distance
                                </Col>
                                <Col>
                                    {computeDistance().toFixed(2)} meters
                                </Col>
                            </Row>
                            <Row className={"mt-4"}>
                                <Col>
                                    <Button variant={"secondary"} onClick={(e) => undo()}>Undo</Button>
                                </Col>
                                <Col>
                                    <Button variant={"danger"} onClick={(e) => reset()}>Reset</Button>
                                </Col>
                                <Col>
                                    <Button variant={"danger"} onClick={(e) => stopEditing()}>Stop editing</Button>
                                </Col>
                            </Row>
                        </>
                    )
                else
                    return (
                        <Row>
                            <Col>
                                <Button variant={"danger"} onClick={(e) => reset()}>Reset</Button>
                            </Col>
                            <Col>
                                <Button variant={"danger"} onClick={(e) => stopEditing()}>Stop editing</Button>
                            </Col>
                        </Row>
                    )
            case 'loading':
                return (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )
            case 'error':
                return (
                    <Alert variant={"danger"}>
                        Something went wrong
                    </Alert>
                )
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <h4>Bus line path</h4>
                </Col>
            </Row>
            {chooseComponent()}
        </>
    )
}

export default BusLinePathEditorComponent;