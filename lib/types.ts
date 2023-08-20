export interface User {
    id: string;
    name: string;
    picture?: string;
    ships?: Ship[];
}

export interface Ship {
    id: number;
    coordinates: Coordinate[],
    color: string,
}

export interface Coordinate {
    x: number,
    y: number,
    exploded: boolean,
}

export interface Data {
    users: User[],
    playing: boolean,
    winner: boolean,
}