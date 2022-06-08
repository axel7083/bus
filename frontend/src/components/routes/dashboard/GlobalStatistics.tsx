import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import React from "react";
import { Col, Row } from "react-bootstrap";

interface IGlobalStat {
    nb_bus: number;
    nb_driver: number;
}
interface IStatsGl {
    nbBus: string;
    NbDriver: string;
}

const GlobalStatistics = () => {
    const [nbDriverC, setnbDiverC] = useState(0);
    const [nbDriverLineC, setDriverPerLineC] = useState(0);
    const [nbBusC, setnbBusC] = useState(0);
    const [nbBusPerLineC, setnbBusPerLineC] = useState(0);
    const [nbExchangeC, setnbExchangeC] = useState(0);
    const [nbDelayC, setnbDelayC] = useState(0);
    let driverCounter = 0;
    let busCounter = 0;
    let exchangeCounter = 0;
    let delayCounter = 0;
    useEffect(() => {
        fetch('http://localhost:3000/dataBaseLineIdentity.json')
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                console.log("dashboard:", response);
                driverCounter = 0;
                busCounter = 0;
                exchangeCounter = 0;
                for (let i = 0; i < response.length; i++) {
                    driverCounter = driverCounter + response[i].nb_driver;
                    busCounter = busCounter + response[i].nb_bus;
                    if (response[i].exchange != undefined) {
                        for (let j = 0; j < response[i].exchange.length; j++) {
                            if (response[i].exchange[j] != "") {
                                exchangeCounter = exchangeCounter + 1;
                            }
                        }
                    }
                }
                setnbExchangeC(exchangeCounter);
                setnbDiverC(driverCounter);
                setnbBusC(busCounter);
                setDriverPerLineC(Math.floor(driverCounter / (response.length + 1)));
                setnbBusPerLineC(Math.floor(busCounter / (response.length + 1)));


            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    }, []);



    useEffect(() => {
        fetch('http://localhost:3000/dbResultSimulation.json')
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                delayCounter = 0;
                for (let i = 0; i < response.length; i++) {
                    for (let j = 0; j < response[i].horraire.length; j++) {
                        delayCounter = delayCounter + parseInt(response[i].horraire[j][5]);
                    }
                }
                setnbDelayC(delayCounter / (response.length+1));
               })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    }, [0]);




    return (
        <Container>
            <Row className="color">
                <Row className="DashboardCellExchange"><p>Exchange point Count</p><p>{nbExchangeC}</p></Row>
                <Row className="DashboardCellNbBus"><p>Bus Count</p><p>{nbBusC}</p><p>avg per line : {nbBusPerLineC}</p></Row>
                <Row className="DashboardCellPop"><p>Population covered</p><p>TO DO with PYTHON</p></Row>
                <Row className="DashboardCellNbDriver"><p>Driver Count </p><p>{nbDriverC}</p><p>avg per line : {nbDriverLineC}</p></Row>
                <Row className="DashboardCellNbDelay"><p>Delay Count</p><p>avg. per line : {nbDelayC}</p></Row>


             </Row>
        </Container>
    )
}
export default React.memo(GlobalStatistics);