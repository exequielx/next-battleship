import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Data } from "./types";

import { CHANGE_SHIPS_EVENT, UPDATE_DATA_EVENT } from './events';
import { generateRandomShips } from "./helpers";

export default function useGame(playerName: any) {
  const boardSize = 10;
  const [data, setData] = useState<Data>();
  const socketRef = useRef<any>();

  const randomizeShips = () => {
    const ships = generateRandomShips(9, [1, 2, 3, 3, 4, 4, 5]);
    sendEvent(CHANGE_SHIPS_EVENT, ships);
  }

  const getMyShips = () => {
    return data?.users?.find(r => r.id === socketRef.current.id)?.ships;
  }

  const addListeners = () => {
    socketRef.current.on(UPDATE_DATA_EVENT, (_data: Data) => {
      setData(_data);
    });
  };

  const connectToSocket = () => {
    fetch('/api/socketio').finally(() => {
      socketRef.current = io({
        query: { name: playerName }
      });

      socketRef.current.on("connect", () => {
        console.log(`connected with id: ${socketRef.current.id}`);
      });

      addListeners();

      return () => {
        socketRef.current.disconnect();
      };
    });
  };
  useEffect(() => {
    if (!playerName) { return; }
    connectToSocket();
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
    data,
    boardSize,
    randomizeShips,
    getMyShips,
  };
}      