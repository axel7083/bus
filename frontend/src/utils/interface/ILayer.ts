import {IMarker} from "./IMarker";
import IPolyline from "./IPolyline";


// This interface defines the properties of a layer.
// It can have multiple lines, markers, and can be visible or not
interface ILayer {
    id: string;
    displayed: boolean;
    name: string;
    markers: IMarker[];
    polylines: IPolyline[];
}

export default ILayer;