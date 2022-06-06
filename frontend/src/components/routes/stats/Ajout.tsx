import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Ajout.css"

const App = () => (
    <Container>
        <div className="container">

            <h1>Line n°1</h1>

            <h2>L1 <small>Debitus - Terminus</small></h2>

            <ul className="line">
                <li className="BusLineStart"><strong>Debitus</strong> </li>
                <li className="BusLineStop">STOP 1</li>
                <li className="BusLineStop">STOP 2</li>
                <li className="BusLineStop">STOP 3</li>
                <li className="BusLineStop">STOP 4
      <ul className="connections">
                        <li className="connections__line"><span className="badge badge--bus">1</span></li>
                        <li className="connections__line"><span className="badge badge--bus">2</span></li>
                        <li className="connections__line"><span className="badge badge--bus">3</span></li>
                        <li className="connections__line"><span className="badge badge--bus">4</span></li>
                    </ul>
                </li>
                <li className="BusLineStop">STOP 5
      <ul className="connections">
                        <li className="connections__line"><span className="badge badge--bus">7</span></li>
                        <li className="connections__line"><span className="badge badge--bus">8</span></li>
                    </ul>
                </li>
                <li className="BusLineStop">STOP 6
      <ul className="connections">
                        <li className="connections__line"><span className="badge badge--bus" >8</span></li>
                    </ul>
                </li>

                <li className="BusLineEnd"><strong>Terminus</strong>
                </li>
            </ul>


        </div>
    </Container>
);

export default App;

