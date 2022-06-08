import Container from "react-bootstrap/Container";
import React from "react";
import { Col, Row } from "react-bootstrap";


type props3 = {
    nbDriver: number,
    //nbBus: number,
    salary: number
    //loan : number
}

const Expenses = ({ nbDriver, salary}: props3) => {
    return (
        <Row className="color">
            <Col className="color">
                <h4>Expenses</h4>
                <Container>
                    <Row>
                        <Col className="DashboardCellNbDriver"><p>Drivers expenses </p><p> {nbDriver} * {salary} = {nbDriver * salary}&euro;</p></Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
};
export default Expenses;