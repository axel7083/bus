import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {add, deleteBusLine, selectBusLines} from "../../../../../store/features/busLines/busLinesSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {IBusLine} from "../../../../../utils/interface/IBusLine";
import {v4} from "uuid";
import {useEffect} from "react";
import {
    deleteLayer,
    selectDisplay,
    setVisibility,
    updateOrAddLayer
} from "../../../../../store/features/display/displaySlice";
import {createLayerFromIBusLine} from "./Utils";

const BusLinesListComponent = ({onEditLine}: {onEditLine: (d: IBusLine) => void}) => {
    const busLines = useAppSelector(selectBusLines);
    const layers = useAppSelector(selectDisplay).layers
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("BusLinesListComponent");
        for (let i = 0; i < layers.length; i++) {
            console.log("layer", layers[i].name);
            if(layers[i].name === "Stops") {
                dispatch(setVisibility({layer: i, value: false}));
            }
        }

        for (let i = 0; i < busLines.length; i++) {
            dispatch(updateOrAddLayer(createLayerFromIBusLine(busLines[i])));
        }
    }, [busLines]);

    // Deleting a line
    const onDelete = (lineId: string) => {
        // First deleting the line
        dispatch(deleteBusLine(lineId));

        // Deleting the path layer
        dispatch(deleteLayer(lineId));

        // Deleting the stop layer
        dispatch(deleteLayer(`stops-${lineId}`));
    }

    return (
        <Container>
            <Row className={"mt-4"}>
                <Col>
                    <h3>Bus lines</h3>
                </Col>
            </Row>
            {busLines.map((value, index) => {
                return (
                    <Row className={"mt-2"} style={{alignItems: "center", display: "flex"}} key={index}>
                        <Col md={"auto"}>
                            <span style={
                                {
                                    height: "15px",
                                    width: "15px",
                                    borderRadius: "50%",
                                    backgroundColor: value.color,
                                    display: "inline-block"
                                }} className="dot"></span>
                        </Col>
                        <Col>
                            {value.name}
                        </Col>
                        <Col md={"auto"}>
                            <Button onClick={(e) => {
                                onEditLine(value);
                            }}>Edit</Button>
                        </Col>
                        <Col md={"auto"}>
                            <Button variant={"danger"} onClick={(e) => {
                                onDelete(value.id);
                            }}>Delete</Button>
                        </Col>
                    </Row>
                )
            })}
            <Row className={"mt-4"}>
                <Col>
                    <Button onClick={(e) => {
                        dispatch(add({
                            id: v4(),
                            nodeHistory: [],
                            path: [],
                            name: "unknown",
                            color: "#ff0000",
                            busCount: 1,
                            conductorCount: 1,
                            busStops: []
                        }))
                    }}>Create new line</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default BusLinesListComponent;