import { Album } from "./album";

export type Periple = {
    name: string;
    id: string;
    description?: string;
    nodes: NetworkNode[];
    links: NetworkLink[];
}

export type NetworkNode = {
    id: string;
    album: Album;
}

export type NetworkLink = {
    from: string;
    to: string;
    description?: string;
    name?: string;
}