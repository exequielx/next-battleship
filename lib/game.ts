import { generateRandomShips } from "./helpers";
import { Data, Ship, boardSize, shipScheme } from "./types";

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
            ships: generateRandomShips(boardSize - 1, shipScheme),
        });
    }
}

export const removeUser = (id: string) => {
    data.users = data.users.filter(r => r.id !== id);
}

export const changeShips = (userId: string, ships: Ship[]) => {
    data.users = data.users.map(r => {
        if (userId === r.id) {
            r.ships = ships;
        }
        return r;
    });
}
