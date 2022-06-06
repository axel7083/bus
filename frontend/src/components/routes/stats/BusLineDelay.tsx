import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Ajout.css";
import React from "react";
import { Col, Row } from "react-bootstrap";
import StatisticsSumUp from "./StatisticsSumUp";

interface ISimulationResult {
    id_line: number;
    horraire: string[][];
}

export interface IDelays {
    critique: number;
    acceptable: number;
}

type props2 = {
    id: number
}

const BusLineDelay = ({ id }: props2) => {
    const [simulationResult, setSimulationResult] = useState<ISimulationResult | undefined>();
    let nb_critic_delay = 0;
    let nb_medium_delay = 0;
    let total_stop = 0;
    var nb_exchange = 0;
    useEffect(() => {
        console.log("useEffect BusLineDelay");
        // Fetch
        fetch('http://localhost:3001/dbResultSimulation.json')
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                console.log("setSimulationResults:", response);
                for (let i = 0; i < response.length; i++) {
                    if (response[i].id_line === id) {
                        setSimulationResult(response[i]);
                        break;
                    }
                }
                
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    }, [id]);
    
    function compareLatestArrival(h1: string, h2: string) {
        total_stop++;
        let minutesH1 = parseInt(h1[3] + h1[4]);
        let heureH1 = parseInt(h1[0] + h1[1]);
        let minutesH2 = parseInt(h2[3] + h2[4]);
        let heureH2 = parseInt(h2[0] + h2[1]);

        if (h1 == h2 || minutesH1 + 5 > minutesH2) {
            return "rgb(39, 247, 136)";
        }
        else if (minutesH1 + 10 > minutesH2) {
            nb_medium_delay++;
            return "rgb(255,165,0)";

        }
        else {
            nb_critic_delay++;
            return "rgb(247,63,39)";

        }
    }

    function compareAverageArrival(h1: string, h2: string) {
        total_stop++;
        let minutesH1 = parseInt(h1[3] + h1[4]);
        let heureH1 = parseInt(h1[0] + h1[1]);
        let minutesH2 = parseInt(h2[3] + h2[4]);
        let heureH2 = parseInt(h2[0] + h2[1]);

        if (minutesH2 <= minutesH1 + 1 && minutesH2 >= minutesH1 - 1) {
            return "rgb(39, 247, 136)";
        }
        else if (minutesH2 <= minutesH1 + 3 && minutesH2 >= minutesH1 - 3) {
            nb_medium_delay++;
            return "rgb(255,165,0)";
        }
        else {
            nb_critic_delay++;
            return "rgb(247,63,39)";
        }
    }

    function compareEarlierArrival(h1: string, h2: string) {
        total_stop++;
        if (h2 < h1) {
            nb_medium_delay++;
            return "rgb(255,165,0)";
        }
        else if (h2 > h1) {           
            nb_critic_delay++;
            return "rgb(247,63,39)";
        }
        else {
            return "rgb(39, 247, 136)";
        }
    }
    return (
        <Container>
            <br></br>
            <Row className="ContainerStatOneLine">
                <Col>
                    <Row className="color">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Expected time</th>
                                    <th>Earliest Arrival</th>
                                    <th>Latest Arrival</th>
                                    <th>Average arrival</th>
                                    <th>Delays Counts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {simulationResult?.horraire.map((value, index) => {  
                                return (
                                        <tr key={ index }>
                                        <th>{value[0]}</th>
                                            <td>{value[1]}</td>
                                            <td style={{ backgroundColor: compareEarlierArrival(value[1], value[2]) } }>{value[2]}</td>
                                            <td style={{ backgroundColor: compareLatestArrival(value[1],value[3]) }}>{value[3]}</td>
                                            <td style={{ backgroundColor: compareAverageArrival(value[1], value[4]) }}>{value[4]}</td>
                                            <td style={{ backgroundColor: (parseInt(value[5]) <= 2) ? "rgb(39, 247, 136)" : (parseInt(value[5]) <= 5) ? "rgb(255,165,0)" : "rgb(247,63,39)" }}>{value[5]}</td>
                                        </tr>
                                        )
                                })}
                            </tbody>
                        </Table>
                    </Row>
                    <StatisticsSumUp
                        nbCriticDelay={nb_critic_delay}
                        nbMediumDelay={nb_medium_delay}
                        nbSchedule={total_stop}
                    ></StatisticsSumUp>
                </Col>
            </Row>
        </Container>
    )
 }
export default React.memo(BusLineDelay);