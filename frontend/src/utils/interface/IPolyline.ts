import {LatLngLiteral} from "leaflet";

// This interface defines a polyline
// It is an ordered list of position combined with a color and a weight
interface IPolyline {
    positions: LatLngLiteral[];
    color: string;
    weight?: number;
}

export default IPolyline;