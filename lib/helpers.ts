import { Cell, boardSize } from "./types";

export const generateRandomCells = (coordMaxSize: number, shipSizes: number[]) => {
    const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateShipCoordinates = (size: number, prevCoordinates: any[]): any => {
        const direction = getRandomNumber(0, 1);
        const coordinates = [];

        if (direction === 0) {
            const startX = getRandomNumber(0, coordMaxSize - size);
            const startY = getRandomNumber(0, coordMaxSize);
            for (let i = 0; i < size; i++) {
                coordinates.push({ x: startX + i, y: startY });
            }
        } else {
            const startX = getRandomNumber(0, coordMaxSize);
            const startY = getRandomNumber(0, coordMaxSize - size);
            for (let i = 0; i < size; i++) {
                coordinates.push({ x: startX, y: startY + i });
            }
        }
        if (coordinates.some(r => prevCoordinates.includes(`${r.x}${r.y}`))) {
            return generateShipCoordinates(size, prevCoordinates);
        }
        return coordinates;
    };

    const board: Cell[] = [];
    const ships: any = [];
    for (let i = 1; i <= shipSizes.length; i++) {
        const size = shipSizes[i];
        const availableColors = colorOptions.filter(color => !ships.some((ship: any) => ship.color === color));
        const color = availableColors[getRandomNumber(0, availableColors.length - 1)];
        const prevCoords = ships.reduce((acc: any[], current: any) => [...acc, ...current.coordinates.map((s: any) => `${s.x}${s.y}`)], [])
        const coordinates = generateShipCoordinates(size, prevCoords);
        ships.push({ id: i, color, coordinates });
    }

    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            let obj: Cell = {
                id: x + y,
                hasShip: false,
                exploded: false,
                hide: false,
                x,
                y,
            };
            ships.forEach((ship: any) => {
                if (!ship?.coordinates) {
                    console.log(ship)
                }
                ship.coordinates.forEach((coord: any) => {
                    if (coord.x === x && coord.y === y) {
                        obj = { ...obj, hasShip: true, color: ship.color, };
                    }
                });
            });
            board.push(obj);
        }
    }
    return board;
};

const colorOptions = [
    'rgb(255, 0, 0)',
    'rgb(0, 255, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 255, 0)',
    'rgb(0, 255, 255)',
    'rgb(255, 0, 255)',
    'rgb(128, 0, 0)',
    'rgb(0, 128, 0)',
    'rgb(0, 0, 128)',
    'rgb(128, 128, 0)',
    'rgb(0, 128, 128)',
    'rgb(128, 0, 128)',
    'rgb(255, 128, 0)',
    'rgb(0, 255, 128)',
    'rgb(128, 0, 255)',
    'rgb(255, 128, 128)',
    'rgb(128, 255, 128)',
    'rgb(128, 128, 255)',
    'rgb(192, 192, 192)',
    'rgb(128, 128, 128)',
    'rgb(255, 255, 255)',
    'rgb(255, 165, 0)',
    'rgb(0, 128, 0)',
    'rgb(70, 130, 180)',
    'rgb(139, 69, 19)',
    'rgb(205, 92, 92)',
    'rgb(60, 179, 113)',
    'rgb(218, 165, 32)',
    'rgb(128, 0, 0)',
];