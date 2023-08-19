import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { User, Ship } from "./types";

import {
  MYSHIPS_UPDATE_EVENT,
  REFRESH_MYSHIPS_UPDATE_EVENT,
  USERS_UPDATE_EVENT,
} from './events';
import { generateRandomShips } from "./helpers";

export default function useGame(playerName: any) {
  const boardSize = 10;
  const [users, setUsers] = useState<User[]>([]);
  const [myShips, setMyShips] = useState<Ship[]>();
  const [ships, setShips] = useState<Ship[]>();
  const socketRef = useRef<any>();

  const randomizeShips = () => {
    const ships = generateRandomShips(9, [1, 2, 3, 3, 4, 4, 5]);
    sendEvent(MYSHIPS_UPDATE_EVENT, ships);
  }

  useEffect(() => {
    if (!playerName) { return; }

    fetch('/api/socketio').finally(() => {
      socketRef.current = io({
        query: { name: playerName }
      });

      // socketRef.current.on("connect", () => {
      //   console.log(socketRef.current.id);
      // });

      socketRef.current.on(USERS_UPDATE_EVENT, (users: User[]) => {
        setUsers(users);
      });

      socketRef.current.on(REFRESH_MYSHIPS_UPDATE_EVENT, (ships: Ship[]) => {
        setMyShips(ships);
      });

      return () => {
        socketRef.current.disconnect();
      };
    });
  }, [playerName]);

  const sendEvent = (type: string, value: any) => {
    if (!socketRef.current) return;
    socketRef.current.emit(type, {
      body: value,
      id: socketRef.current.id,
      name: playerName,
    });
  };

  return {
    users,
    ships,
    myShips,
    boardSize,
    randomizeShips,
  };
}      