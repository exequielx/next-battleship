export const generateRandomShips = () => {
    return [
        {
            id: 1,
            color: 'red',
            coordinates: [{ x: 0, y: 1, exploded: false }, { x: 0, y: 2, exploded: false }, { x: 0, y: 3, exploded: false },],
        },
        {
            id: 2,
            color: 'blue',
            coordinates: [{ x: 3, y: 3, exploded: false }, { x: 4, y: 3, exploded: true }, { x: 5, y: 3, exploded: false },],
        },
        {
            id: 3,
            color: 'green',
            coordinates: [{ x: 8, y: 2, exploded: true }, { x: 8, y: 3, exploded: true },],
        },
    ];
};