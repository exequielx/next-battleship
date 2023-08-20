import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Data, boardSize, shipScheme } from "./types";

import { CHANGE_CELLS_EVENT, PLAY_EVENT, UPDATE_DATA_EVENT } from './events';
import { generateRandomCells } from "./helpers";

export default function useGame(playerName: any) {
  const [data, setData] = useState<Data>();
  const socketRef = useRef<any>();

  const play = (target: string, x: number, y: number) => {
    sendEvent(PLAY_EVENT, { target, x, y });
  };

  const randomizeCells = () => {
    const cells = generateRandomCells(boardSize - 1, shipScheme);
    sendEvent(CHANGE_CELLS_EVENT, cells);
  }

  const getCells = (userId: string | undefined, hide: boolean = false) => {
    if (!userId) { return []; }
    const cells = data?.users?.find(r => r.id === userId)?.cells;
    if (hide) {
      return cells?.map(r => {
        r.hide = true;
        return r;
      });
    }
    return cells;
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

      // socketRef.current.on("connect", () => {
      //   console.log(`connected with id: ${socketRef.current.id}`);
      // });

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
    randomizeCells,
    getCells,
    userId: socketRef?.current?.id,
    play,
  };
}      