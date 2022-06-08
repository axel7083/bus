import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Expenses from "./Expenses";
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

























 

    const [nbDriver2C, setnbDriver2C] = useState(0);
        let driverCounter2 = 0;
        useEffect(() => {
            fetch('http://localhost:3000/dataBaseLineIdentity.json')
                .then(response => response.json()) // Transform the response in json
                .then(response => {
                    driverCounter2 = 0;
                    for (let i = 0; i < response.length; i++) {
                        driverCounter2 = driverCounter2 + response[i].nb_driver;
                    }
                    setnbDriver2C(driverCounter2);
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
    /*
        return (
                            <Table striped bordered hover>
                               
                                <tbody>
                                    {dashResult?.horraire.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{value[0]}</th>
                                                <td>{value[1]}</td>
                                                <td style={{ backgroundColor: compareEarlierArrival(value[1], value[2]) }}>{value[2]}</td>
                                                <td style={{ backgroundColor: compareLatestArrival(value[1], value[3]) }}>{value[3]}</td>
                                                <td style={{ backgroundColor: compareAverageArrival(value[1], value[4]) }}>{value[4]}</td>
                                                <td style={{ backgroundColor: (parseInt(value[5]) <= 2) ? "rgb(39, 247, 136)" : (parseInt(value[5]) <= 5) ? "rgb(255,165,0)" : "rgb(247,63,39)" }}>{value[5]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
        )
    }

*/














    return (
        

        <Container>
            <br></br>
            



            <Row>
                <Col lg={4}>
                    <GlobalStatistics></GlobalStatistics>
                </Col>
                <Col>
                    
                    <Row className="color" style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", margin: "0.5em" }}>
                        <h1>Delay analysis</h1>
                        <br></br><br></br><br></br>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th> Name of the line</th>
                                    <th> Critic delay count on several simulation </th>
                                    <th> Minimum delay (minutes) </th>
                                    <th> Average delay (minutes) </th>
                                    <th> Maximum delay (minutes) </th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    dashResult2?.map((value, index) => {
                                        let name = value.name;
                                        nb_critic_delay = 0;
                                        let max_delay = 0;
                                        let min_delay = 0;
                                        let avg_delay = 0;
                                        let all_horaire = value.horraire;
                                        let j = all_horaire.length - 1;
                                        let firstHour = all_horaire[j][1];
                                        let secondHour = all_horaire[j][3];
                                        let h1 = firstHour[0] + firstHour[1];
                                        let h2 = secondHour[0] + secondHour[1];
                                        let m1 = parseInt(firstHour[3] + firstHour[4]);
                                        let m2 = parseInt(secondHour[3] + secondHour[4]);
                                        console.log(m1, m2)
                                        if (h1 == h2) {
                                            max_delay = m2 - m1;
                                        }
                                        else {
                                            max_delay = 60 - m1 + m2;

                                        }

                                        firstHour = all_horaire[j][1];
                                        secondHour = all_horaire[j][2];
                                        h1 = firstHour[0] + firstHour[1];
                                        h2 = secondHour[0] + secondHour[1];
                                        m1 = parseInt(firstHour[3] + firstHour[4]);
                                        m2 = parseInt(secondHour[3] + secondHour[4]);
                                        if (h1 == h2) {
                                            min_delay = m2 - m1;
                                        }
                                        else {
                                            min_delay = 60 - m1 + m2;

                                        }

                                        firstHour = all_horaire[j][1];
                                        secondHour = all_horaire[j][4];
                                        h1 = firstHour[0] + firstHour[1];
                                        h2 = secondHour[0] + secondHour[1];
                                        m1 = parseInt(firstHour[3] + firstHour[4]);
                                        m2 = parseInt(secondHour[3] + secondHour[4]);
                                        if (h1 == h2) {
                                            avg_delay = m2 - m1;
                                        }
                                        else {
                                            avg_delay = 60 - m1 + m2;

                                        }


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
                                                <td>{min_delay}</td>
                                                <td>{avg_delay}</td>
                                                <td>{max_delay}</td>

                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                        </Table>
                        <br></br>
                        <br></br>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th> Line's name</th>
                                        <th> Maximum Delay (minutes) </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        dashResult2?.map((value, index) => {
                                            let name = value.name;
                                            nb_critic_delay = 0;
                                            let max_delay = 0;
                                            let j = value.horraire.length - 1;
                                            let firstHour = value.horraire[j][1];
                                            let secondHour = value.horraire[j][3];
                                            let h1 = firstHour[0] + firstHour[1];
                                            let h2 = secondHour[0] + secondHour[1];
                                            let m1 = parseInt(firstHour[3] + firstHour[4]);
                                            let m2 = parseInt(secondHour[3] + secondHour[4]);
                                            console.log(m1, m2)
                                            if (h1 == h2) {
                                                max_delay = m2 - m1;
                                            }
                                            else {
                                                max_delay = 60 - m1 + m2;

                                            }
                                            return (

                                                <tr key={index}>
                                                    <th>{name}</th>
                                                    <td>{max_delay}</td>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </Table>
                            </Col>
                        <Col className="DashboardCellNbDelay"><p>Total delay count : </p><p>{totalDelayC}</p></Col>
                </Row>









                    <Row className="color" style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", margin: "0.5em" }}>
                        <Expenses
                            nbDriver={nbDriver2C}
                            salary={2733}
                        ></Expenses>
                    </Row>
                </Col>
                </Row>

            <br></br>
        </Container>
    )
}
/*We export the component we have created*/
export default Dashboard;
