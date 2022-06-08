import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import {Card, Table} from "react-bootstrap";
//import "./Ajout.css";
import React from "react";
import { Col, Row } from "react-bootstrap";
import StatisticsSumUp from "./StatisticsSumUp";
import {IBusLine} from "../../../utils/interface/IBusLine";
import {useAppSelector} from "../../../store/hooks";
import {selectBusLineById} from "../../../store/features/busLines/busLinesSlice";
import {latLng} from "leaflet";
import {timeFromInt} from "time-number";

/* This interface will be used to access the element id_line and horraire for a particular line from the JSON file*/
interface ISimulationResult {
    id_line: number;
    horraire: string[][];
}

/* This interface will be used to access the number of delays that are critics or acceptable*/
export interface IDelays {
    critique: number;
    acceptable: number;
}

type props2 = {
    id: string
}
/**
 * We create a component for the delays on a bus line. We use a hook to print the value in the JSON files associated (dbResultSimulation)
 * We search in the JSON file which id is the same as the one wanted.
 * @param param0
 */
const BusLineDelay = ({ id }: props2) => {

    const busLine: IBusLine = useAppSelector((state) => selectBusLineById(state, id))!;


    const [simulationResult, setSimulationResult] = useState<ISimulationResult | undefined>();
    let nb_critic_delay = 0;
    let nb_medium_delay = 0;
    let total_stop = 0;
    var nb_exchange = 0;
    useEffect(() => {
        //console.log("useEffect BusLineDelay");
        // Fetch
        fetch('http://localhost:5000/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_line: busLine.id, name: busLine.name, horraire: busLine.busStops.map((stop) => {
                return {long: latLng(stop.position).lng, lat: latLng(stop.position).lat, name: stop.name, hours: timeFromInt(Number(stop.schedule))}
                })}),
        })
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                console.log("setSimulationResult:", response);
                setSimulationResult(response);
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    }, [id]);

    /**
     * We compare the value between the latest arrival schedule (h2) and the expected arrival schedule(h1) to know if the delay is
     * - a critic one (red)
     * - an acceptable one (green)
     * - a medium one (orange)
     * We put the colors according to the following rules:
     * - green :  h1 = h2 or h1 + 5 minutes > h2
     * - orange : h1 + 10 minutes > h2
     * - red : all other cases
     * h1 : the expected arrival hour
     * h2 : the latest arrival hour
     * With add one to each of the counter according to the color obtained (green: acceptable; red: critics; orange : medium)
     */
    function compareLatestArrival(h1: string, h2: string) {
        total_stop++;
        let minutesH1 = parseInt(h1[3] + h1[4]);
        let heureH1 = parseInt(h1[0] + h1[1]);
        let minutesH2 = parseInt(h2[3] + h2[4]);
        let heureH2 = parseInt(h2[0] + h2[1]);
        if (h1 == h2 || minutesH1 + 5 > minutesH2) {
            return "rgb(39, 247, 136)"; //green
        }
        else if (minutesH1 + 10 > minutesH2) {
            nb_medium_delay++;
            return "rgb(255,165,0)"; //orange
        }
        else {
            nb_critic_delay++;
            return "rgb(247,63,39)"; //red
        }
    }
    /**
     * We compare the value between the average arrival schedule (h2) and the expected arrival schedule(h1) to know if the delay is
     * - a critic one (red)
     * - an acceptable one (green)
     * - a medium one (orange)
     * We put the colors according to the following rules:
     * - green :  h1 - 1 minute <= h2 <= h1 + 1 minutes
     * - orange :  h1 - 3 minutes <= h2 <= h1 + 3 minutes
     * - red : all other cases
     * h1 : the expected arrival hour
     * h2 : the latest arrival hour
     * With add one to each of the counter according to the color obtained (green: acceptable; red: critics; orange : medium)
     */
    function compareAverageArrival(h1: string, h2: string) {
        total_stop++;
        let minutesH1 = parseInt(h1[3] + h1[4]);
        let heureH1 = parseInt(h1[0] + h1[1]);
        let minutesH2 = parseInt(h2[3] + h2[4]);
        let heureH2 = parseInt(h2[0] + h2[1]);

        if (minutesH2 <= minutesH1 + 1 && minutesH2 >= minutesH1 - 1) {
            return "rgb(39, 247, 136)"; //green
        }
        else if (minutesH2 <= minutesH1 + 3 && minutesH2 >= minutesH1 - 3) {
            nb_medium_delay++;
            return "rgb(255,165,0)"; //orange
        }
        else {
            nb_critic_delay++;
            return "rgb(247,63,39)"; //red
        }
    }
    /**
     * We compare the value between the earlier arrival schedule (h2) and the expected arrival schedule(h1) to know if the delay is
     * - a critic one (red)
     * - an acceptable one (green)
     * - a medium one (orange)
     * We put the colors according to the following rules:
     * - green :  h2 = h1
     * - orange :  h2 < h1
     * - red : h2 > h1
     * h1 : the expected arrival hour
     * h2 : the latest arrival hour
     * With add one to each of the counter according to the color obtained (green: acceptable; red: critics; orange : medium)
     */
    function compareEarlierArrival(h1: string, h2: string) {
        total_stop++;
        if (h2 < h1) {
            nb_medium_delay++;
            return "rgb(255,165,0)";
        }
        else if (h2 > h1) {
            nb_critic_delay++;
            return "rgb(247,63,39)";
        }
        else {
            return "rgb(39, 247, 136)";
        }
    }
    return (
        <Row>
            <Col>
                <Card>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Expected time</th>
                                    <th>Earliest Arrival</th>
                                    <th>Latest Arrival</th>
                                    <th>Average arrival</th>
                                    <th>Delays Counts</th>
                                </tr>
                                </thead>
                                <tbody>
                                {simulationResult?.horraire.map((value, index) => {
                                    return (
                                        <tr key={ index }>
                                            <th>{value[0]}</th>
                                            <td>{value[1]}</td>
                                            <td style={{ backgroundColor: compareEarlierArrival(value[1], value[2]) } }>{value[2]}</td>
                                            <td style={{ backgroundColor: compareLatestArrival(value[1],value[3]) }}>{value[3]}</td>
                                            <td style={{ backgroundColor: compareAverageArrival(value[1], value[4]) }}>{value[4]}</td>
                                            <td style={{ backgroundColor: (parseInt(value[5]) <= 2) ? "rgb(39, 247, 136)" : (parseInt(value[5]) <= 5) ? "rgb(255,165,0)" : "rgb(247,63,39)" }}>{value[5]}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card>
                <Card className={"mt-4"}>
                    <StatisticsSumUp
                        nbCriticDelay={nb_critic_delay}
                        nbMediumDelay={nb_medium_delay}
                        nbSchedule={total_stop}
                    />
                </Card>
            </Col>
        </Row>

    )
}
export default React.memo(BusLineDelay);