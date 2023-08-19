export const generateRandomShips = (cant: number, maxSize: number) => {
    const ships: any = [];

    const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateShipCoordinates = (size: number) => {
        const direction = getRandomNumber(0, 1); // 0: horizontal, 1: vertical
        const coordinates = [];

        if (direction === 0) {
            const startX = getRandomNumber(0, maxSize - size);
            const startY = getRandomNumber(0, maxSize);
            for (let i = 0; i < size; i++) {
                coordinates.push({ x: startX + i, y: startY, exploded: false });
            }
        } else {
            const startX = getRandomNumber(0, maxSize);
            const startY = getRandomNumber(0, maxSize - size);
            for (let i = 0; i < size; i++) {
                coordinates.push({ x: startX, y: startY + i, exploded: false });
            }
        }

        return coordinates;
    };

    for (let id = 1; id <= cant; id++) {
        const size = getRandomNumber(1, 5);
        const availableColors = colorOptions.filter(color => !ships.some((ship: any) => ship.color === color));
        const color = availableColors[getRandomNumber(0, availableColors.length - 1)];
        const coordinates = generateShipCoordinates(size);
        ships.push({ id, color, coordinates });
    }
    return ships;
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