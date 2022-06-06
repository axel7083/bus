import { useMapEvents } from 'react-leaflet';
import {LatLngExpression} from "leaflet";


// This function must be wrapped in the map, and it allows us to fetch the click event
const GetPosition = ({onMapClicked} : {onMapClicked: (pos: LatLngExpression) => void}) => {
    useMapEvents({
        click(e) {
            onMapClicked(e.latlng)
        },
    })
    return null
}

export default GetPosition;