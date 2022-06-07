import {Marker, Popup} from 'react-leaflet';
import markerIcon from "./MarkerIcon";
import {IMarker} from "../interface/IMarker";

// This component is used to render all the Markers in the map
const Markers = ({ markers }: {markers: IMarker[]}): JSX.Element => {
    return (
        <>
            {markers.map((marker, index) => {
                return <Marker
                    key={index}
                    icon={markerIcon(marker.color)}
                    position={marker.pos}
                    eventHandlers={{
                        click:(e) => {
                            console.log(e);
                            if(marker.callback !== undefined)
                                marker.callback(marker.id);
                        }}}
                    draggable={false}>
                    {
                        marker.popupText?(
                            <Popup>
                                {marker.popupText}
                            </Popup>
                        ):<></>
                    }
                </Marker>
            })}
        </>
    )
}

export default Markers;

