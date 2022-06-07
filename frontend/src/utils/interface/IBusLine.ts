import {IPathNode} from "./IPathNode";
import {IBusStop} from "./IBusStop";

export interface IBusLine {
    nodeHistory: string[];
    path: IPathNode[];
    name: string;
    id: string;
    color: string;
    conductorCount: number;
    busCount: number;
    busStops: IBusStop[];
}