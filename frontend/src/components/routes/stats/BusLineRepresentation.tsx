import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {Card, Table} from "react-bootstrap";
//import "./Ajout.css"

type props = {
    id: number
}
/**
 * This is used to create the representation of a line on the right side of the view. It is called in the Stats View
 * @param param0 
 */
const BusLineRepresentation = ({ id }: props) => {
    /*
     * This hook is used to read the value from the JSON file to use it in order to print the name of the stop of a line and the exchanges point.
     */
    const [objectStat3, setobjectStat3] = useState<any[]>([]);
    /*
     * We use useEffect to read the JSON file and if there is any error, we print it
     */
    useEffect(() => {
        fetch('http://localhost:3000/db2.json') //Pay attention to the localhost number
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                //console.log("RESPONSE:", response);
                setobjectStat3(response)
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
        
    },[id])
    /*
     In the return part, we create a container with a list constaining the name of the stop and their exchanges points
     */
    return (
        <Card>
            <br></br>
            <h2>L1<small>Debitus - Terminus</small></h2>
                <ul className="line">
                    <li className="BusLineStart"><strong>Debitus</strong> </li>
                {objectStat3.map((value, index) => {  
                    if (value.id_line == id) {
                        return (
                            <li key={index} className="BusLineStop">{value.name}
                                <ul className="connections">
                                    {value.exchange != undefined &&
                                        <li key={index} className="connections__line"><span className="badge2">{value.exchange}</span> </li>
                                    }
                                </ul>
                            </li>
                        )
                    }
                    
                })}
                    <li className="BusLineEnd"><strong>Terminus</strong> </li>
                </ul>
        </Card>
    )
}
/*We export the component we have created*/
export default BusLineRepresentation;