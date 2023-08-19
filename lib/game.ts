import { Ship } from "./types";

let myShips: Ship[];

export const setMyShips = (ships: Ship[]) => {
    myShips = ships;
}

export const getMyShips = () => myShips;
 