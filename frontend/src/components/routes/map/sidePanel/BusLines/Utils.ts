// This function create a path from a way geometry, using the starting point to the end.
import {geometry} from "../../../../../api/api";
import {IBusLine} from "../../../../../utils/interface/IBusLine";
import ILayer from "../../../../../utils/interface/ILayer";

export const createPath = (way: geometry, start: string, end: string) => {
    const sortedPositions = Object
        .entries(way)
        .sort((a, b) => a[1].index-b[1].index)
        .map((pair) => {
            return {pos:{lat: pair[1].lat, lng: pair[1].lon}, id: pair[0]}
        })

    const startIndex =  Math.min(way[start].index, way[end].index);
    const endIndex = Math.max(way[start].index, way[end].index);

    sortedPositions.splice(endIndex + 1);
    sortedPositions.splice(0, startIndex);

    if(way[end].index < way[start].index)
        return sortedPositions.reverse();
    return sortedPositions;
}

export const createLayerFromIBusLine = (busLine: IBusLine): ILayer => {

    return {
        id: busLine.id,
        displayed: true,
        name: busLine.name,
        markers: [],
        polylines: [{positions: busLine.path.map((v) => v.pos), color: busLine.color, weight: 10}]
    }
}
