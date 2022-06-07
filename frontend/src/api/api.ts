import {LatLng, LatLngExpression, LatLngLiteral} from "leaflet";
import Way, {isBusCompatible} from "./models/Way";


type node_dict = {[id: number]: LatLngLiteral};


type node = {lat: number, lon: number, ways: number, index: number}
export type geometry = {[id: string]: node}
type INodeExplorer = {geometries: { [id: string]: { geometry: geometry, name: string } }, nodes_meta: {[id: string]: string[]}}

export type INodeDict = {[id: string]: LatLngExpression};
/**
 * This class defines a simple api for fetching and receiving data about OpenStreet map
 */
class Api {

    // From a position get all the ways, and nodes nearby
    static find_nodes = (latLng: LatLng, callback: (e: INodeDict) => void, onError: () => void)  => {
        console.log("query_features");
        fetch(`http://127.0.0.1:5000/explore?lat=${latLng.lat}&lon=${latLng.lng}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                const nodes_pos: INodeDict = {}
                for (let i = 0; i < response.elements.length; i++) {
                    if(response.elements[i]['type'] === 'node') {
                        const node = response.elements[i] as {'id': number, 'lat': number, 'lon': number};
                        nodes_pos[`${node.id}`] = {lat: node.lat, lng: node.lon};
                    }
                }
                callback(nodes_pos);
            })
            .catch(error => {
                console.log("ERROR");
                onError();
                console.log(error);
            });
    }

    // Get all the ways (roads) of a node
    static get_ways = (node_id: number, callback: (way_ids: string[], node_id: number) => void) => {
        fetch(`http://127.0.0.1:5000/ways?node_id=${node_id}`)
            .then(response => response.json())
            .then(response => {
                callback(response.elements.filter((value: {tags?: {[id: string]: string}}) => isBusCompatible(value.tags?.['highway'])).map((value: {id: string}) => value.id), node_id);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Get all the nodes and the properties of a way (road)
    static get_ways_full = (way_id: string, callback: (node_dict: node_dict, node_order: number[]) => void) => {
        fetch(`http://127.0.0.1:5000/nodes?way_id=${way_id}`)
            .then(response => response.json())
            .then(response => {

                const node_dict: node_dict = {}
                let node_order: number[] = [];

                for (let i = 0; i < response.elements.length; i++) {
                    if(response.elements[i].type === "way") {
                        node_order = response.elements[i].nodes;
                    }
                    else {
                        node_dict[response.elements[i].id] = {lat: response.elements[i].lat, lng: response.elements[i].lon}
                    }
                }

                callback(node_dict, node_order);
            })
            .catch(error => {
                console.log(error);
            });
    }

    static explorer_node = (node_id: string, callback: (content: INodeExplorer) => void) => {
        fetch(`http://127.0.0.1:5000/explorer_node?node_id=${node_id}`)
            .then(response => response.json())
            .then(response => {
                callback(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default Api;