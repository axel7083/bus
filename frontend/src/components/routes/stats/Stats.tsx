import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import BusLineRepresentation from "./BusLineRepresentation";
import React, { useState } from "react";
import {Card, Col, Row} from "react-bootstrap";
import BusLineDelay from "./BusLineDelay";
import { useEffect } from "react";
import {useAppSelector} from "../../../store/hooks";
import {selectBusLines} from "../../../store/features/busLines/busLinesSlice";

interface ISimulationR {
    id_line: number;
    name: string;
}
interface ILine {
    name: string;
    id: string;
}
/*
 Stats is used to create all the components needed to show the performance of a particular line. 
 We will create a dynamic select that will give the user the possibility to show the statistics for a line.
 Then, we will show the delays that we have calculated with the back end that are saved in a JSON file.
 Finally, we will show a small representation of a line.
 */
const Stats = () => {

    const busLines = useAppSelector(selectBusLines);

    const [busLineId, setBusLineId] = useState<string | undefined>(undefined);

    /*
    * We return a container with a title, a select with the value read and
     * we call the components BusLineDelay and BusLineRepresentation.
     * To have a proper display, we use <Col> and <Row>
    */
    return (
        <div style={{backgroundColor: "#eee", height: "100vh"}}>
            <Container>
                <br></br>
                <h2>Evaluation of the delays in minutes</h2>
                <br></br>
                <Row>
                    <Col>
                        <Form.Select
                            className={"mb-4"}
                            aria-label="Default select example"
                            onChange={(e) => {
                                console.log("[Stats] Form onChange", e.target.value);
                                if(Number(e.target.value) === 0)
                                    setBusLineId(undefined)
                                else
                                    setBusLineId(e.target.value);
                            }}>
                            <option key="0" value ="0">Choose a line</option>
                            {busLines.map((value, index) => {
                                return (
                                    <option key={index} value={value.id}>{value.name}</option>)
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                {
                    (busLineId === undefined)?(<div>Select a line to display informations about it.</div>):(
                        <>
                            <h5>Data obtained</h5>
                            <Row className="ContainerStatOneLine">
                                <Col>
                                    <BusLineDelay
                                        id={busLineId}
                                    />
                                </Col>
                                <Col md={"auto"}>
                                    <BusLineRepresentation
                                        id={busLineId}
                                    />
                                </Col>
                            </Row>
                    </>)
                }

            </Container>
        </div>
    )
}
export default Stats;