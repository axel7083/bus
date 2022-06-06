import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import Markers from "../../../../utils/leaflet/Markers";
import {IMarker} from "../../../../utils/interface/IMarker";
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { selectDisplay } from '../../../../store/features/display/displaySlice'
import GetPosition from "../../../../utils/leaflet/GetPosition";
import {setPosition} from "../../../../store/features/position/positionSlice";
import Polylines from "../../../../utils/leaflet/Polylines";
import IPolyline from "../../../../utils/interface/IPolyline";


const MapWrapper = (
    {center, zoom} :
        {center: LatLngExpression, zoom: number}) => {

    const display = useAppSelector(selectDisplay);

    const dispatch = useAppDispatch();

    const [markers, setMarkers] = useState<IMarker[]>([]);
    const [polylines, setPolylines] = useState<IPolyline[]>([]);

    useEffect(() => {
        let n_markers: IMarker[] = [];
        let n_polylines: IPolyline[] = [];

        for(let i = 0; i < display.layers.length; i++) {
            if(display.layers[i].displayed) {
                n_markers = [...n_markers, ...display.layers[i].markers];
                n_polylines = [...n_polylines, ...display.layers[i].polylines];
            }
        }

        setMarkers(n_markers);
        setPolylines(n_polylines);
    }, [display]);


    return (
        <MapContainer
            center={center}
            style={{ height: "100%", width: "100%" }}
            zoom={zoom}
            maxZoom={18}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />

            <Markers markers={markers}/>
            <Polylines polylines={polylines}/>

            <GetPosition onMapClicked={(d: LatLngExpression) => {
                // We cannot send non-serializable variable in the store.
                dispatch(setPosition({...d}));
            }}/>

        </MapContainer>
    )
}
export default MapWrapper