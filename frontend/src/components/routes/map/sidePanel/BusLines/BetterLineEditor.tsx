import Button from "react-bootstrap/Button";
import {IBusLine} from "../../../../../utils/interface/IBusLine";
import Container from "react-bootstrap/Container";
import BusLineFormComponent from "./BusLineFormComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BusLinePathEditorComponent from "./BusLinePathEditorComponent";
import {useState} from "react";
import {Card, Nav} from "react-bootstrap";
import BusLineStopsEditorComponent from "./BusLineStopsEditorComponent";

type props = {
    busLine: IBusLine,
    onSavedLine: () => void
}

export const BetterLineEditor = ({busLine, onSavedLine} :props) => {

    const [key, setKey] = useState<string>('#path');

    // Prevent user to switch tab if something is loading
    const [busy, setBusy] = useState<boolean>(false);

    return (
        <Container>
            <Row className={"mt-4"}>
                <Col>
                    <Card>
                        <Card.Body>
                            <BusLineFormComponent id={busLine.id}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={"mt-4"}>
                <Col>
                    <Card>
                        <Card.Header>
                            <Nav variant="tabs" defaultActiveKey={key} onSelect={(k) => setKey(k!)}>
                                <Nav.Item>
                                    <Nav.Link disabled={busy} href="#path">Path</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link disabled={busy} href="#stops">Bus Stops</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            {(key === '#path')?(
                                <BusLinePathEditorComponent id={busLine.id} setBusy={setBusy}/>
                            ):(
                                <BusLineStopsEditorComponent id={busLine.id}/>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={"mt-4"}>
                <Col>
                    <Button onClick={(e) => {
                        onSavedLine();
                    }}>Close</Button>
                </Col>
            </Row>
        </Container>
    )
}