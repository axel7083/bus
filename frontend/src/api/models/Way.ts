import { LatLngLiteral} from "leaflet"

interface APIQueryFeaturesWay {
    id: string;
    type: string;
    tags?: {[id: string]: string};
    geometry: ({ lat: number, lon: number } | null)[];
}

// According
export const isBusCompatible = (highway?: string) => {
    switch (highway) {
        case "motorway":
        case "trunk":
        case "primary":
        case "secondary":
        case "tertiary":
        case "residential":
        case "unclassified": // bridges
            return true;
        default:
            return undefined;
    }
}

// A way is a road
class Way {
    id: string;
    tags: {[id: string]: string};
    geometry: LatLngLiteral[];

    constructor(id: string, tags: {[id: string]: string}, geometry: LatLngLiteral[]) {
        this.id = id;
        this.tags = tags;
        this.geometry = geometry;
    }

    static from_request_query_features = (obj: APIQueryFeaturesWay) => {
        // If it is not a way
        if(obj.type !== 'way')
            return undefined;

        // If the way is useless
        if(!isBusCompatible(obj.tags?.['highway']))
            return undefined;

        // We store the geometry of the way
        const geometries: LatLngLiteral[] = [];
        for (let i = 0; i < obj.geometry.length; i++) {
            if(obj.geometry[i] != null)
                geometries.push({lat: obj.geometry[i]!.lat, lng: obj.geometry[i]!.lon });
        }

        return new Way(obj.id, obj.tags!, geometries);
    }
}

export default Way;