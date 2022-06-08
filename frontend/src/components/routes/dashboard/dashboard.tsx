import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import GlobalStatistics from "./GlobalStatistics";

type props = {
    id: number
}

interface IDashR {
    name_line: string;
    criticity_line: number;
    horraire: string[][];
}

interface IDash {
    name: string;
    criticity: string;
    horraire: string[][];
}



const Dashboard = () => {


    const [totalDelayC, setTotalDelayC] = useState(0);
    const [totalCriticDelay, settotalCriticDelay] = useState(0); //1
    let totaldelayCounter = 0;
    useEffect(() => {
        fetch('http://localhost:3000/dbResultSimulation.json')
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                console.log("result:", response);
                totaldelayCounter = 0;
                for (let i = 0; i < response.length; i++) {
                    for (let j = 0; j < response[i].horraire.length; j++) {
                        totaldelayCounter = totaldelayCounter + parseInt(response[i].horraire[j][5]);
                    }
                }

                setTotalDelayC(totaldelayCounter);

            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    }, []);






    const [dashResult, setdashResult] = useState<IDash | undefined>();
    const [dashResult2, setdashResult2] = useState<[]>([]);

    let nb_critic_delay = 0;
    let nb_retard = 0;
   // let tab = [];
        useEffect(() => {
            // Fetch
            fetch('http://localhost:3000/dbResultSimulation.json')
                .then(response => response.json()) // Transform the response in json
                .then(response => {
                    console.log("IDashR:", response);
                    //setdashResult(response);
                    nb_critic_delay = 0;
                    nb_retard = 0;
                    //tab = [];

                    for (let i = 0; i < response.length; i++) {
                        nb_critic_delay = 0;
                        for (let j = 0; j < response[i].horraire.length; j++) {
                            if (compareEarlierArrival(response[i].horraire[j][1], response[i].horraire[j][2])){
                                nb_critic_delay++;
                            }
                            if (compareLatestArrival(response[i].horraire[j][1], response[i].horraire[j][3])) {
                                nb_critic_delay++;
                            }
                            if (compareAverageArrival(response[i].horraire[j][1], response[i].horraire[j][4])) {
                                nb_critic_delay++;
                            }
                           
                        }
                        //tab.push({ name_line: `${nb_critic_delay}`, criticity: `${response[i].name}` });
                        
                       

                        console.log("i : " + nb_critic_delay + " for line : " + response[i].name);
                    }
                    settotalCriticDelay(nb_critic_delay);
                    /*setdashResult((response as IDashR[]).map((value => {
                        return { name: `${value.name_line}`, criticity: `${value.criticity_line}`, horraire: `${value.horraire}` };
                    })));*/

                    setdashResult2(response); 


                    })
         
                .catch(error => {
                    console.log("error:");
                    console.log(error);
                });
        }, []);

        
        function compareLatestArrival(h1: string, h2: string) {
            let minutesH1 = parseInt(h1[3] + h1[4]);
            let minutesH2 = parseInt(h2[3] + h2[4]);
            if ((h1 == h2 || minutesH1 + 5 > minutesH2) || (minutesH1 + 10 > minutesH2) ) {
                return false;
            }
            else {
                return true;
            }
        }
       
        function compareAverageArrival(h1: string, h2: string) {
            let minutesH1 = parseInt(h1[3] + h1[4]);
            let minutesH2 = parseInt(h2[3] + h2[4]);
            if (((minutesH2 <= minutesH1 + 1 && minutesH2 >= minutesH1 - 1) || (minutesH2 <= minutesH1 + 3 && minutesH2 >= minutesH1 - 3))) {
                return false;
            }
            else {
                return true;
            }
        }
        function compareEarlierArrival(h1: string, h2: string) {
            if (h2 > h1) {
                return true;
            }
            else {
                return false;
            }
    }
    return (
        <Container>
            <Row>
                <Col lg={4}>
                    <GlobalStatistics></GlobalStatistics>
            </Col>
            <Col>
                <Row className="color">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th> Name of the line</th>
                                    <th> Critic delay count </th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    dashResult2?.map((value, index) => {
                                        let name = value.name;
                                        nb_critic_delay = 0;
                                        for (let j = 0; j < value.horraire.length; j++) {
                                            if (compareEarlierArrival(value.horraire[j][1], value.horraire[j][2])) { nb_critic_delay++; }
                                            if (compareLatestArrival(value.horraire[j][1], value.horraire[j][3])) { nb_critic_delay++; }
                                            if (compareAverageArrival(value.horraire[j][1], value.horraire[j][4])) { nb_critic_delay++; }
                                        }
                                        console.log("i : " + nb_critic_delay + " for line : " + value.name);

                                        return (

                                            <tr key={index}>
                                                <th>{name}</th>
                                                <td>{nb_critic_delay}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                </Row>
                <Row className="color">
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th> Line's name</th>
                                        <th> Average Delay (minutes) </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th> Line 1</th>
                                        <th> 3 </th>
                                    </tr>
                                    <tr>
                                        <th> Line 2</th>
                                        <th> 4 </th>
                                    </tr>
                                    <tr>
                                        <th> Line 3</th>
                                        <th> 5 </th>
                                    </tr>
                                </tbody>
                            </Table>
                            </Col>
                        <Col className="DashboardCellNbDelay"><p>Total delay count : </p><p>{totalDelayC}</p></Col>
                </Row>
        
                </Col>
                </Row>

            <br></br>
        </Container>
    )
}
/*We export the component we have created*/
export default Dashboard;
