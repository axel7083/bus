import Container from "react-bootstrap/Container";
import React from "react";
import { Row } from "react-bootstrap";
import {useAppSelector} from "../../../store/hooks";
import {selectBusLines} from "../../../store/features/busLines/busLinesSlice";

const GlobalStatistics = ({totaldelayCounter, busCount, driverCount}: {totaldelayCounter: number, busCount: number, driverCount: number}) => {

    const busLines = useAppSelector(selectBusLines);
    return (
        <Container style={{backgroundColor: "white", padding: "10px", borderRadius: "10px", margin: "0.5em"}}>
                <Row className="DashboardCellExchange"><p>Exchange point Count</p><p>0</p></Row>
                <Row className="DashboardCellNbBus"><p>Bus Count</p><p>{busCount}</p><p>avg per line : {busCount/busLines.length}</p></Row>
                <Row className="DashboardCellNbDriver"><p>Driver Count </p><p>{driverCount}</p><p>avg per line : {driverCount/busLines.length}</p></Row>
                <Row className="DashboardCellNbDelay"><p>Delay Trigger</p><p>avg. per line : {totaldelayCounter}</p></Row>


        </Container>
    )
}
export default React.memo(GlobalStatistics);