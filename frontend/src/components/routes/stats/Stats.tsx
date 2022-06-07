import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import BusLineRepresentation from "./BusLineRepresentation";
import React, { useState } from "react";
import {Card, Col, Row} from "react-bootstrap";
import BusLineDelay from "./BusLineDelay";
import { useEffect } from "react";

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
    /*
     * The hook for lines and setLines will be used to create the select component with all the lines we have in the JSON file.
     * The second hook with busLineId and setBusLineId will be used to give as a parameter to the other components that are created dynamically
     * (BusLineRepresentation & BusLineDelay) the id of the line we want to print information about.
     */
    const [lines, setLines] = useState<ILine[]>([]);
    const [busLineId, setBusLineId] = useState<number | undefined>(undefined); //1
    /*
     * The useEffect allows us to have information about the line in the JSON file called dbResultSimulation.
     * Once we have it, we will only use the id (value.id_line) and the name of the line (value.name).
     * If there is any error, we print it.
     */
    useEffect(() => {
        //console.log("useEffect Stats");
        fetch('http://localhost:3000/dbResultSimulation.json')
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                //console.log("Reponse:", response);
                setLines((response as ISimulationR[]).map((value => {
                    return { id: `${value.id_line}`, name: `${value.name}` };
                })));
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    }, []);
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
                                setBusLineId(Number(e.target.value));
                            }}>
                            <option key="0" value ="0">Choose a line</option>
                            {lines.map((value, index) => {
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