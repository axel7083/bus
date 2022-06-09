import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {IBusLine} from "../../../../../utils/interface/IBusLine";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectBusLineById, update} from "../../../../../store/features/busLines/busLinesSlice";
import {selectPosition} from "../../../../../store/features/position/positionSlice";
import {ChangeEvent, useEffect, useState} from "react";
import {latLng, LatLngLiteral} from "leaflet";
import {updateOrAddLayer} from "../../../../../store/features/display/displaySlice";
import {Form, FormControl, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import IPolyline from "../../../../../utils/interface/IPolyline";
import {v4} from "uuid";
import ReactTimePicker from "../../../../utils/ReactTimePicker";
import {IPathNode} from "../../../../../utils/interface/IPathNode";
import { timeFromInt } from "time-number";

function inside(point: [number, number], vs: number[][]) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    const x = point[0], y = point[1];

    let inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][0], yi = vs[i][1];
        const xj = vs[j][0], yj = vs[j][1];

        const intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

interface Bound {
    xy1: LatLngLiteral;
    xy2: LatLngLiteral;
    xy3: LatLngLiteral;
    xy4: LatLngLiteral;
    previous: string;
    next: string
}

const getIPolyline = (bound: Bound): IPolyline => {
    return {
        positions: [bound.xy1, bound.xy2, bound.xy3, bound.xy4, bound.xy1],
        color: "#46853c",
        weight: 1
    }
}

const contains = (bound: Bound, pos: LatLngLiteral) => {
    const polygon = [ [ bound.xy1.lat, bound.xy1.lng ], [ bound.xy2.lat, bound.xy2.lng ], [ bound.xy3.lat, bound.xy3.lng ], [ bound.xy4.lat, bound.xy4.lng ] ];
    return inside([ pos.lat, pos.lng ], polygon);
}

const createExternalMiddle = (A: IPathNode, B: IPathNode): Bound | undefined => {

    const start: LatLngLiteral = A.pos;
    const end: LatLngLiteral = B.pos;
    const d = ((start.lat*0.000002)/Math.sqrt(Math.pow(start.lng-end.lng, 2)+Math.pow(end.lat - start.lat, 2)));
    if(d === Infinity) {
        return undefined;
    }
    const d1 = d*(start.lng - end.lng);
    const d2 = d*(end.lat - start.lat);

    const xy1 = {
        lat: start.lat + d1,
        lng: start.lng + d2,
    };

    const xy2 = {
        lat: end.lat + d1,
        lng: end.lng + d2,
    };

    const xy3 = {
        lat: end.lat - d1,
        lng: end.lng - d2,
    };

    const xy4 = {
        lat: start.lat - d1,
        lng: start.lng - d2,
    };

    return {
        xy1: xy1,
        xy2: xy2,
        xy3: xy3,
        xy4: xy4,
        previous: A.id,
        next: B.id
    }
}

const BusLineStopsEditorComponent = ({id}: {id: string}) => {

    const busLine: IBusLine = useAppSelector((state) => selectBusLineById(state, id))!;

    const [bounds, setBounds] = useState<Bound[]>([]);

    // the latest position clicked
    const position = useAppSelector(selectPosition);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const bounds = [];
        for (let i = 0; i < busLine.path.length - 1; i++) {
            const bound = createExternalMiddle(busLine.path[i], busLine.path[i+1]);
            if(bound !== undefined)
                bounds.push(bound);
        }

        dispatch(updateOrAddLayer({
                id: `stops-${id}`,
                displayed: true,
                name: "Stops",
                markers: busLine.busStops.map((busStop, index) => {
                    return {
                        pos: busStop.position,
                        color: busLine.color,
                        id: index,
                        popupText: `${(busStop.name.length === 0)?"No name defined":busStop.name} | ${timeFromInt(Number(busStop.schedule))}`
                    }
                }),
                polylines: bounds.map((bound) => getIPolyline(bound))
            }
        ));
        setBounds(bounds);

    }, [busLine]);

    useEffect(() => {
        for (let i = 0; i < bounds.length; i++) {
            if(contains(bounds[i], latLng(position))) {
                console.log("")
                dispatch(update({
                    ...busLine,
                    busStops: [...busLine.busStops, {
                        position: position,
                        id: v4(),
                        name: "",
                        schedule: 0,
                        previousNodeId: bounds[i].previous,
                        nextNodeId: bounds[i].next,
                    }]
                }))
                break;
            }
        }

    }, [position]);

    return (
        <Row>
            <Col>
                <h4>Bus line stops</h4>
                {busLine.busStops.map((value, index, array) => {

                    return (
                        <InputGroup className="mb-3">
                            <Form.Control type="text" value={value.name} placeholder="Enter name" onChange={(e) => {
                                const busStopsCopy = [...busLine.busStops];
                                const busStop = {...busStopsCopy[index]}
                                busStop.name = e.target.value;
                                busStopsCopy[index] = busStop;

                                dispatch(update({
                                    ...busLine,
                                    busStops: busStopsCopy
                                }));
                            }} />
                            <ReactTimePicker
                                onChange={(e: string) => {
                                    const busStopsCopy = [...busLine.busStops];
                                    const busStop = {...busStopsCopy[index]}
                                    busStop.schedule = Number(e);
                                    busStopsCopy[index] = busStop;

                                    dispatch(update({
                                        ...busLine,
                                        busStops: busStopsCopy
                                    }));
                                }}
                                value={value.schedule}
                                previous={(index>0)?timeFromInt(array[index-1].schedule+5*60):"00:00"}
                            />
                            <Button variant="danger" onClick={(e) => {
                                const busStopsCopy = [...busLine.busStops];
                                busStopsCopy.splice(index, 1);
                                dispatch(update({
                                    ...busLine,
                                    busStops: busStopsCopy
                                }));
                            }}>
                                Delete
                            </Button>
                        </InputGroup>
                    )
                })}
            </Col>
        </Row>
    )
}

export default BusLineStopsEditorComponent;