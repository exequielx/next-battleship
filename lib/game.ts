import { generateRandomCells } from "./helpers";
import { Cell, Data, boardSize, shipScheme } from "./types";

export const data: Data = {
    users: [],
    playing: undefined,
    currentTurn: null,
    winner: false,
};

export const updateUser = async (playerName: string, id: string) => {
    if (data && data.users.some(r => r.name === playerName)) {
        data.users = data.users.map(r => {
            if (r.name === playerName) { r.id = id; }
            return r;
        });
    } else {
        data.users.push({
            id,
            name: playerName,
            cells: generateRandomCells(boardSize - 1, shipScheme),
        });
    }
}

export const changeShips = (playerName: string, cells: Cell[]) => {
    data.users = data.users.map(r => {
        if (playerName === r.name) {
            r.cells = cells;
        }
        return r;
    });
}

export const doPlay = (target: string, x: number, y: number) => {
    let somePartExploded = false;
    data.users = data.users.map(r => {
        if (target === r.name) {
            r.cells = r.cells?.map(cell => {
                if (cell.x === x && cell.y === y) {
                    cell.exploded = true;
                    cell.hide = false;
                    if (cell.hasShip) {
                        somePartExploded = true;
                    }
                }
                return cell;
            });
        }
        return r;
    });
    if (!somePartExploded) {
        data.currentTurn = data.users[(data.users.findIndex(user => user.name === data.currentTurn) + 1) % data.users.length].name || data.users[0].name;
    }
}

export const changeGameStatus = (status: boolean) => {
    data.playing = status;
    if (data.playing) {
        data.currentTurn = data.users[Math.floor(Math.random() * data.users.length)].name;
    }
}