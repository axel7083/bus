import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Expenses from "./Expenses";
import GlobalStatistics from "./GlobalStatistics";
import {useAppSelector} from "../../../store/hooks";
import {selectBusLines} from "../../../store/features/busLines/busLinesSlice";
import {latLng} from "leaflet";
import {timeFromInt} from "time-number";

interface IDash {
    name: string;
    criticity: string;
    horraire: string[][];
    id_line: number;
}

const Dashboard = () => {

    const busLines = useAppSelector(selectBusLines);

    const [totalDelayC, setTotalDelayC] = useState(0);
    const [totalCriticDelay, settotalCriticDelay] = useState(0); //1
    const [dashResult, setdashResult] = useState<IDash[]>([]);

    const [busCount, setBusCount] = useState<number>(0);
    const [driverCount, setDriverCount] = useState<number>(0);


    const [totalPassenger, setTotalPassenger] = useState<number>(0);
    const [totalFullC, setTotalFullC] = useState<number>(0);

    useEffect(() => {

        fetch('http://localhost:5000/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(busLines.map((busLine) => {
                return {
                    id_line: busLine.id,
                    name: busLine.name,
                    horraire: busLine.busStops.map((stop) => {
                        return {
                            long: latLng(stop.position).lng,
                            lat: latLng(stop.position).lat,
                            name: stop.name,
                            hours: timeFromInt(Number(stop.schedule)),
                            attractiveness: stop.attractiveness,
                        }
                    }),
                    nb_bus: busLine.busCount,
                    nb_driver: busLine.conductorCount,
                }
            })),
        }).then(response => response.json())
            .then(response => {
                console.log("result:", response);
                let totaldelayCounter = 0;
                let busCount = 0;
                let driverCount = 0 ;

                for (let i = 0; i < busLines.length; i++) {
                    busCount += busLines[i].busCount;
                    driverCount += busLines[i].conductorCount;
                }
                setBusCount(busCount);
                setDriverCount(driverCount);

                let passager = 0;
                let countFull = 0;
                for (let i = 0; i < response.length; i++) {
                    for (let j = 0; j < response[i].horraire.length; j++) {
                        totaldelayCounter = totaldelayCounter + parseInt(response[i].horraire[j][5]);
                    }
                    passager += response[i].passager;
                    countFull+= response[i].nb_time_full;
                }

                setTotalPassenger(passager);
                setTotalDelayC(totaldelayCounter);
                setTotalFullC(countFull);



                let nb_critic_delay = 0;

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
                }
                settotalCriticDelay(nb_critic_delay);
                setdashResult(response);
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            })
    }, [busLines]);


    const [nbDriver2C, setnbDriver2C] = useState(0);

    useEffect(() => {
        let count = 0;
        for (let i = 0; i < busLines.length; i++) {
            count += busLines[i].conductorCount;
        }
        setnbDriver2C(count);
    }, [busLines]);


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


    function compareDashBoardArrival(firstHour: string, secondHour : string) {
        let h1 = firstHour[0] + firstHour[1];
        let h2 = secondHour[0] + secondHour[1];
        let m1 = parseInt(firstHour[3] + firstHour[4]);
        let m2 = parseInt(secondHour[3] + secondHour[4]);
        let max_delay = 0;
        if (h1 == h2) {
            max_delay = m2 - m1;
        }
        else {
            max_delay = 60 - m1 + m2;
        }
        return max_delay;
    }






    return (
        

        <Container>
            <br></br>
            



            <Row>
                <Col lg={4}>
                    <GlobalStatistics driverCount={driverCount} busCount={busCount} totaldelayCounter={totalDelayC} />
                </Col>
                <Col>
                    
                    <Row className="color" style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", margin: "0.5em" }}>
                        <h1>Delay analysis</h1>
                        <br></br><br></br><br></br>
                        <Table striped bordered hover style={{margin: "auto" }}>
                            <thead>
                                <tr>
                                    <th> Name of the line</th>
                                    <th> Delays Count (several simulation) </th>
                                    <th> Minimum delay (minutes) </th>
                                    <th> Average delay (minutes) </th>
                                    <th> Maximum delay (minutes) </th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    dashResult?.map((value, index) => {
                                        let name = value.name;
                                        let nb_critic_delay = 0;
                                        let all_horaire = value.horraire;

                                        if(all_horaire.length === 0)
                                            return <></>

                                        let j = all_horaire.length - 1;
                                        let firstHour = all_horaire[j][1];
                                        let secondHour = all_horaire[j][3];
                                        let max_delay = compareDashBoardArrival(firstHour, secondHour);
                                        secondHour = all_horaire[j][2];
                                        let min_delay = compareDashBoardArrival(firstHour, secondHour);
                                        secondHour = all_horaire[j][4];
                                        let avg_delay = compareDashBoardArrival(firstHour, secondHour);                                    
                                        for (let j = 0; j < value.horraire.length; j++) {
                                            if (compareEarlierArrival(value.horraire[j][1], value.horraire[j][2])) { nb_critic_delay++; }
                                            if (compareLatestArrival(value.horraire[j][1], value.horraire[j][3])) { nb_critic_delay++; }
                                            if (compareAverageArrival(value.horraire[j][1], value.horraire[j][4])) { nb_critic_delay++; }
                                        }
                                        return (

                                            <tr key={index} onClick={(e) => {
                                                console.log("[Dashboard] OnClick", value.id_line);
                                                
                                            }}>
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
                        <Col className="DashboardCellNbDelay"><p>Total delay count (on several simulation): </p><p>{totalDelayC}</p></Col>
                </Row>



                    <Row className="color" style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", margin: "0.5em" }}>
                        <Row className="color">
                            <Col className="color">
                                <h4>Usesul or not?</h4>
                                <Container>
                                    <Row>
                                        <Col className="DashboardCellNbDriver"><p> Number of passenger on the simulation:</p> <p>{totalPassenger} </p></Col>
                                        <Col className="DashboardCellNbDriver"><p> Number of time a bus was full:</p> <p>{totalFullC}</p></Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>

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
            
            <Row style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", margin: "0.5em" }}>
                <Container>
                    <h2>Help - Caption</h2>
                    <br></br>
                <ul>
                    <li>
                        <p><strong>Bus Count</strong> : The number total of bus that the network need to work. The second number is an approximation if we divide this number into all the line</p>
                    </li>
                    <li>
                            <p><strong>Population covered</strong> : The number of people that are covered by your bus lines. It is calculated saying that a bus stop has an influence represented by a circle around it.</p>
                    </li>
                    <li>

                            <p><strong>Driver Count</strong> : The number total of drivers that the network need to work. The second number is an approximation if we divide this number into all the line</p>
                    </li>
                        <li>
                            <p><strong>Delay Trigger</strong> : The number total of critics delays that can happen according to the simulation</p>
                        </li>
                        <li>
                            <p><strong>Delay analysis </strong> : A table with the total delay that can occurs in a line. A positive number means that the bus will be late of n minutes at the end of its loop and a negative number means that the bus will be in advane at the end of its loop.</p>
                        </li>
                    </ul>

                    </Container> 
                    
            </Row>
        </Container>
    )
}
/*We export the component we have created*/
export default Dashboard;
