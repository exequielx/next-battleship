import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { User, Ship } from "./types";

import {
  USERS_UPDATE_EVENT,
} from './events';
import { generateRandomShips } from "./game";

export default function useGame(playerName: string) {
  const boardSize = 10;
  const [users, setUsers] = useState<User[]>([]);
  const [myShips, setMyShips] = useState<Ship[]>();
  const [ships, setShips] = useState<Ship[]>();
  const socketRef = useRef<any>();

  useEffect(() => {
    if (!playerName) { return; }
    setShips(generateRandomShips(8, boardSize - 1));
    setMyShips(generateRandomShips(8, boardSize - 1));

    fetch('/api/socketio').finally(() => {
      socketRef.current = io({
        query: { name: playerName }
      });

      socketRef.current.on("connect", () => {
        console.log(socketRef.current.id);
      });

      socketRef.current.on(USERS_UPDATE_EVENT, (users: User[]) => {
        setUsers(users);
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
  };
}      