import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Ajout.css";
import React from "react";
import { Col, Row } from "react-bootstrap";
import StatisticsSumUp from "./StatisticsSumUp";
import CSS from 'csstype';

const warning: CSS.Properties = {
    backgroundColor: "rgb(255,165,0)"
};
const critic: CSS.Properties = {
    backgroundColor: "rgb(247,63,39)"
};
const accepted: CSS.Properties = {
    backgroundColor: "rgb(39, 247, 136)"
};

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
    const [delays, setDelays] = useState<IDelays>({ critique: 0, acceptable: 0 });
    var nb_critic_delay = 0;
    var nb_medium_delay = 0;
    const [objectStat, setobjectStat] = useState<string[][]>([]);
    var [valueHv2] = useState<number[]>([]);
    var [valueH2v2] = useState<number[]>([]);
    var [valueHFullv2] = useState<string[]>([]);
    var [valueH2Fullv2] = useState<string[]>([]);
    var [valueH3Fullv2] = useState<string[]>([]);
    var [valueH4Fullv2] = useState<string[]>([]);
    var [valueH3v2] = useState<number[]>([]);
    var [valueH4v2] = useState<number[]>([]);
    var [value5v2] = useState<number[]>([]);
    const [valueStatBackEnd2] = useState<string[][]>([]);
    var done = false;
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
                
                /*if (!done) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].id_line == id) {
                            for (var r = 0; r < response[i].horraire.length; r++) {
                                valueHFullv2.push(response[i].horraire[r][0]);
                                valueH2Fullv2.push(response[i].horraire[r][1]);
                                valueH3Fullv2.push(response[i].horraire[r][2]);
                                valueH4Fullv2.push(response[i].horraire[r][3]);
                                value5v2.push(response[i].horraire[r][4]);
                                var tempTab = [response[i].horraire[r][0], response[i].horraire[r][1], response[i].horraire[r][2], response[i].horraire[r][3], response[i].horraire[r][4]];
                                console.log(tempTab);
                                valueStatBackEnd2.push(tempTab);
                            }
                            done = true;
                        }

                    }
                }

                for (var i = 0; i < valueStatBackEnd2.length; i++) {
                    var temp = parseInt(valueH4Fullv2[i][3] + valueH4Fullv2[i][4]);
                    valueH4v2.push(temp);
                    temp = parseInt(valueH3Fullv2[i][3] + valueH3Fullv2[i][4]);
                    valueH3v2.push(temp);
                    temp = parseInt(valueH2Fullv2[i][3] + valueH2Fullv2[i][4]);
                    valueH2v2.push(temp);
                    temp = parseInt(valueHFullv2[i][3] + valueHFullv2[i][4]);
                    valueHv2.push(temp);
                }
                setobjectStat(valueStatBackEnd2);*/
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    }, [id]);
    

    return (
        <Container>
                <Row>
                    <Col>
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
                                /*
                                setDelays((prev) => {
                                    return { ...prev, critique: prev.critique + 1 };
                                });

*/
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
                        </Col>

                    </Row>
        </Container>
        )

    function compareLatestArrival(h1: string, h2: string) {

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
        if (h2 < h1) {
            return "rgb(255,165,0)";
        }
        else if (h2 > h1) {
            nb_medium_delay++;
            return "rgb(247,63,39)";
        }
        else {
            nb_critic_delay++;
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
                                {objectStat.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>Stop n {index + 1}</th>
                                            <td>{valueHFullv2[index]}</td>
                                            {
                                                (() => {

                                                    if (((valueHv2[index] === valueH2v2[index]) || (valueHv2[index] - 5 < valueH2v2[index])) && (valueH2v2[index] <= valueHv2[index])) {
                                                        return (
                                                            <td style={accepted}>{valueHFullv2[index]}</td>
                                                        )
                                                    } else if ((valueHv2[index] - valueH2v2[index]) > 0 && (valueHv2[index] - valueH2v2[index] < 10)) {
                                                        nb_medium_delay++;
                                                        return (
                                                            <td style={warning}>{valueH2Fullv2[index]}</td>
                                                        )
                                                    } else if (valueHv2[index] - valueH2v2[index] < 0) {
                                                        nb_critic_delay++;
                                                        return (
                                                            <td style={critic} >{valueH2Fullv2[index]}</td>
                                                        )
                                                    }
                                                    else {
                                                        nb_critic_delay++;
                                                        return (
                                                            <td style={critic}>{valueH2Fullv2[5]}</td>
                                                        )
                                                    }
                                                })()
                                            }

                                            {
                                                (() => {
                                                    if (((valueHv2[index] === valueH3v2[index]) || (valueHv2[index] + 5 > valueH3v2[index]))) {
                                                        return (
                                                            <td style={accepted}>{valueH3Fullv2[index]}</td>
                                                        )
                                                    } else if (valueHv2[index] + 10 > valueH3v2[index]) {
                                                        nb_medium_delay++;
                                                        return (
                                                            <td style={warning}>{valueH3Fullv2[index]}</td>
                                                        )
                                                    } else {
                                                        nb_critic_delay++;
                                                        return (
                                                            <td style={critic}>{valueH3Fullv2[index]}</td>
                                                        )
                                                    }
                                                })()
                                            }
                                            {
                                                (() => {
                                                    if ((valueHv2[index] + 1 > valueH4v2[index]) && (valueHv2[index] - 1 < valueH4v2[index])) {
                                                        return (
                                                            <td style={accepted}>{valueH4Fullv2[index]}</td>
                                                        )
                                                    } else if (valueHv2[index] + 3 > valueH4v2[index]) {
                                                        nb_medium_delay++;
                                                        return (
                                                            <td style={warning}>{valueH4Fullv2[index]}</td>
                                                        )
                                                    }
                                                    else {
                                                        nb_critic_delay++;
                                                        return (
                                                            <td style={critic}>{valueH4Fullv2[index]}</td>
                                                        )
                                                    }
                                                })()
                                            }
                                            {
                                                (() => {
                                                    if (value5v2[index] < 2) {
                                                        return (
                                                            <td style={accepted}>{value5v2[index]}</td>
                                                        )
                                                    } else if (value5v2[index] < 5) {
                                                        return (
                                                            <td style={warning}>{value5v2[index]}</td>
                                                        )
                                                    } else {
                                                        return (
                                                            <td style={critic}>{value5v2[index]}</td>
                                                        )
                                                    }
                                                })()
                                            }

                                        </tr>
                                    )
                                })}



                            </tbody>
                        </Table>
                    </Row>
                        
                    <StatisticsSumUp
                        nbCriticDelay={nb_critic_delay}
                        nbMediumDelay={nb_medium_delay}
                        nbSchedule={valueStatBackEnd2.length}
                    ></StatisticsSumUp>
                    
                </Col>
            </Row>
        </Container>
    )
}





export default React.memo(BusLineDelay);