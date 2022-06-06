import Container from "react-bootstrap/Container";
import "./Ajout.css";
import React from "react";
import { Col, Row } from "react-bootstrap";


type props2 = {
    nbCriticDelay: number,
    nbMediumDelay: number,
    nbSchedule: number
}
const StatisticsSumUp = ({ nbCriticDelay, nbMediumDelay, nbSchedule }: props2) => {
    console.log(nbSchedule);
    return (
        <Row className="color">
            <Col className="color">
                <h4>Statistics</h4>
                <Container>
                    <Row>
                        <Col className="nbBusDiv"><p>Bus</p>(TBD)</Col>
                        <Col className="nbDriverDiv"><p>Driver</p>(TBD) </Col>
                        <Col className="nbExchangeDiv"><p>Total Delay</p>{nbCriticDelay + nbMediumDelay } </Col>
                        <Col className="nbCriticDiv"><p>Critic delay</p>{nbCriticDelay}<p>{(nbCriticDelay * 100 / (nbSchedule)).toFixed(2)}%</p></Col>
                        <Col className="nbMediumDiv"><p>Medium delay</p>{nbMediumDelay}<p>{(nbMediumDelay * 100 / (nbSchedule)).toFixed(2)}%</p></Col>
                        <Col className="nbAcceptableDiv"><p>Acceptable</p>{(nbSchedule) - nbMediumDelay - nbCriticDelay}<p>{(((nbSchedule) - nbMediumDelay - nbCriticDelay) * 100 / (nbSchedule)).toFixed(2)}%</p></Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
};

    export default StatisticsSumUp;






