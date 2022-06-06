import {Polyline} from 'react-leaflet';
import IPolyline from "../interface/IPolyline";

// This component is used to render all the polylines in the map
const Polylines = ({ polylines }: {polylines: IPolyline[]}): JSX.Element => {

    return (
        <>
            {polylines.map((polyline, index) => {
                return <Polyline key={index} pathOptions={{color: polyline.color, weight: polyline.weight}} positions={polyline.positions} />
            })}
        </>
    )
}

export default Polylines;

