import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {add, selectBusLines} from "../../../../../store/features/busLines/busLinesSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {IBusLine} from "../../../../../utils/interface/IBusLine";
import {v4} from "uuid";
import {useEffect} from "react";
import {updateOrAddLayer} from "../../../../../store/features/display/displaySlice";
import {createLayerFromIBusLine} from "./Utils";

const BusLinesListComponent = ({onEditLine}: {onEditLine: (d: IBusLine) => void}) => {
    const busLines = useAppSelector(selectBusLines);
    const dispatch = useAppDispatch();

    useEffect(() => {
        for (let i = 0; i < busLines.length; i++) {
            dispatch(updateOrAddLayer(createLayerFromIBusLine(busLines[i])));
        }
    }, [busLines]);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Bus lines</h3>
                </Col>
            </Row>
            {busLines.map((value, index) => {
                return (
                    <Row className={"mt-2"} key={index}>
                        <Col>
                            {value.name}
                        </Col>
                        <Col>
                            <Button onClick={(e) => {
                                onEditLine(value);
                            }}>Edit</Button>
                        </Col>
                        <Col>
                            <Button variant={"danger"}>Delete</Button>
                        </Col>
                    </Row>
                )
            })}
            <Row>
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