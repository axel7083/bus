import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import "./Ajout.css"

type props = {
    id: number
}
const BusLineRepresentation = ({ id }: props) => {
    console.log("Ce que l'on va chercher dans le json : " + id);
    const [objectStat3, setobjectStat3] = useState<any[]>([]);
    const myData = useState<any[]>([]);
    useEffect(() => {

        fetch('http://localhost:3001/db2.json') //Faire attention au localhost number
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                console.log("RESPONSE:");
                console.log(response);
                
                let leng: (number) = response.length;
                for (var i = 0; i < leng; i++) {
                    if (response[i].id_line == id) {
                        myData.push(response[i]);
                        setobjectStat3(response[i].exchange)
                       // setobjectStat3(response[i].exchange)
                    }
                    
                }
                console.log(myData);
                setobjectStat3(response)
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
        
    },[id])

    return (
        <Container>
            <br></br>
                <h2>L1 <small>Debitus - Terminus</small></h2>
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
        </Container>
    )
}

export default BusLineRepresentation;