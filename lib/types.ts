export interface User {
    id: string;
    name: string;
    picture?: string;
}

export interface Ship {
    id: number;
    coordinates: { x: number, y: number, exploded: boolean }[],
    color: string,
}