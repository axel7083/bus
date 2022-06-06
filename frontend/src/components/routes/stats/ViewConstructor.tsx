import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import Ajout from "./Ajout";
import "./Ajout.css"
import BusLineRepresentation from "./BusLineRepresentation";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

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

type props = {
    id: number
}
const ViewConstructor = ({ id }: props) => {
    console.log("Ce que l'on va chercher dans le json : " + id);

    return (
        <Container>

            <br></br>

            <h2>Evaluation of the <b>delays</b> in minutes</h2>
            <br></br>
            <Form.Select aria-label="Default select example">
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
                        Afficher constructeur tableau
                    </Row>
                    <Row className="color">
                        Afficher constructeur Stat
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

export default ViewConstructor;
