import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {Card, Table} from "react-bootstrap";
import {IBusLine} from "../../../utils/interface/IBusLine";
import {useAppSelector} from "../../../store/hooks";
import {selectBusLineById} from "../../../store/features/busLines/busLinesSlice";
//import "./Ajout.css"

type props = {
    id: string
}
/**
 * This is used to create the representation of a line on the right side of the view. It is called in the Stats View
 * @param param0 
 */
const BusLineRepresentation = ({ id }: props) => {

    const busLine: IBusLine = useAppSelector((state) => selectBusLineById(state, id))!;

    /*
     In the return part, we create a container with a list constaining the name of the stop and their exchanges points
     */
    return (
        <Card style={{borderRadius: "10px"}}>
            <br></br>
            <h2>L1<small>Debitus - Terminus</small></h2>
                <ul className="line">
                    <li className="BusLineStart"><strong>Debitus</strong> </li>
                    {
                        busLine.busStops.map((stop, index) => {
                            return (
                                <li key={index} className="BusLineStop">{stop.name}
                                    <ul className="connections">
                                        {/*value.exchange != undefined &&
                                            <li key={index} className="connections__line"><span className="badge2">{value.exchange}</span> </li>
                                        */}
                                    </ul>
                                </li>
                            )
                        })
                    }
                    <li className="BusLineEnd"><strong>Terminus</strong> </li>
                </ul>
        </Card>
    )
}
/*We export the component we have created*/
export default BusLineRepresentation;