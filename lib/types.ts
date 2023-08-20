export const boardSize = 10;
export const shipScheme = [1, 2, 3, 3, 4, 4, 5];

export interface User {
    id: string;
    name: string;
    picture?: string;
    cells?: Cell[];
}

export interface Cell {
    id: number;
    x?: number,
    y?: number,
    hasShip: boolean,
    exploded: boolean,
    hide: boolean,
    color?: string,
}

export interface Data {
    users: User[],
    playing: boolean,
    winner: boolean,
}