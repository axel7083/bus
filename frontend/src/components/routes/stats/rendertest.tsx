import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Ajout.css";
import React from "react";
import { Col, Row } from "react-bootstrap";
import StatisticsSumUp from "./StatisticsSumUp";
import CSS from 'csstype';

const warning: CSS.Properties = {
    backgroundColor: "rgb(255,165,0)"/*'#ff6000', */
};
const critic: CSS.Properties = {
    backgroundColor: "rgb(247,63,39)"/*'#ff0000', */
};
const accepted: CSS.Properties = {
    backgroundColor: "rgb(39, 247, 136)" /*'#00ff50',*/
};

import Form from 'react-bootstrap/Form';
import BusLineRepresentation from "./BusLineRepresentation";

const Test = () => {
    const [loading, setLoading] = useState<boolean>(false);
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
    var valeur = 1;
    useEffect(() => {

        if (loading)
            return;

        setLoading(true);

        // Fetch
        fetch('http://localhost:3001/dbResultSimulation.json')
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                console.log(response);
                if (!done) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].id_line == valeur) {
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
                console.log(valueStatBackEnd2);

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
                setobjectStat(valueStatBackEnd2);
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    }, [])
    var nb_critic_delay = 0;
    var nb_medium_delay = 0;

    return (
        <Container>
            <br></br>

            <h2>Evaluation of the <b>delays</b> in minutes</h2>
            <br></br>
            <Form.Select> 
                <option>Choose a line</option>
                <option value="1">Line1</option>
                <option value="2">Line2</option>
                <option value="3">Line3</option>
            </Form.Select>
            <br></br>
            <h5>Data obtained for Line1</h5>



            <Row className="ContainerStatOneLine">
                <Col>
                    <Row className="color">
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
                    </Row>
                </Col>
                <Col xs={3} >
                    <Row className="color">
                        <Col><BusLineRepresentation
                            id={2}
                        ></BusLineRepresentation>
                        </Col>
                    </Row>
                </Col>
            </Row>


        </Container>
    )
}


export default Test;
































    
    


