import {LatLngExpression} from "leaflet";

export interface IBusStop {
    name: string;
    schedule: string;
    position: LatLngExpression;
    id: string;
    previousNodeId: string;
    nextNodeId: string;
}