import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import SidePanelContainer from "./sidePanel/SidePanelContainer";
import MapWrapper from "./map-wrapper/MapWrapper";
import Container from 'react-bootstrap/Container';


const rowStyle: React.CSSProperties = {
    marginRight: 0,
    marginLeft: 0,
    height: "100vh"
}

const colStyle: React.CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0
}

// The map will be center on this position when started
const center = {lat: 47.64795, lng: 6.85469};

/**
 * The Map component is simply a page, separate in two section
 * on the left, the map, on the right a panel
 */
const Map = () => {

    return (
        <Row style={rowStyle}>
            <Col style={colStyle} sm={8}>
                <MapWrapper zoom={16} center={center}/>
            </Col>
            <Col style={colStyle} sm>
                <Container>
                    <SidePanelContainer/>
                </Container>
            </Col>
        </Row>
    )
}

export default React.memo(Map);