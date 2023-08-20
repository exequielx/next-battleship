import { generateRandomCells } from "./helpers";
import { Cell, Data, boardSize, shipScheme } from "./types";

export const data: Data = {
    users: [],
    playing: false,
    winner: false,
};

export const updateUser = async (id: string, username: string) => {
    if (data && data.users.some(r => r.name === username)) {
        data.users = data.users.map(r => {
            if (r.name === username) { r.id = id; }
            return r;
        });
    } else {
        data.users.push({
            id,
            name: username,
            cells: generateRandomCells(boardSize - 1, shipScheme),
        });
    }
}

export const removeUser = (id: string) => {
    data.users = data.users.filter(r => r.id !== id);
}

export const changeShips = (userId: string, cells: Cell[]) => {
    data.users = data.users.map(r => {
        if (userId === r.id) {
            r.cells = cells;
        }
        return r;
    });
}

export const doPlay = (target: string, x: number, y: number) => {
    data.users = data.users.map(r => {
        if (target === r.id) {
            r.cells = r.cells?.map(cell => {
                if (cell.x === x && cell.y === y) {
                    cell.exploded = true;
                    cell.hide = false;
                }
                return cell;
            });
        }
        return r;
    });
}