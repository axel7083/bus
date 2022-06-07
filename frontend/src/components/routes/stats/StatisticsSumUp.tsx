import Container from "react-bootstrap/Container";
import "./Ajout.css";
import React from "react";
import { Col, Row, Card } from "react-bootstrap";

/*
 In order to create this component, I need some informations about the number of
 - critics delays
 - medium delays
 - schedule
 ...from the BusLineDelay code.*/
type props2 = {
    nbCriticDelay: number,
    nbMediumDelay: number,
    nbSchedule: number
}

/*
 We print the different informations we have in a row with different COL.
 We print the number of total delay, critic and medium delays.
 We also print the % that it represents because, as a matter of fact, it's easier to interpret than a simple number.
 */
const StatisticsSumUp = ({ nbCriticDelay, nbMediumDelay, nbSchedule }: props2) => {
    return (
        <>

            <Card.Body>
                <Card.Title>
                    Statistics
                </Card.Title>
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
            </Card.Body>
        </>
    )
};
    export default StatisticsSumUp;