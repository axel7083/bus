import {LatLngExpression} from "leaflet";

export interface IBusStop {
    name: string;
    schedule: number;
    position: LatLngExpression;
    id: string;
    previousNodeId: string;
    nextNodeId: string;
}