import { Server } from 'socket.io';
import { CHANGE_CELLS_EVENT, CHANGE_GAME_STATUS, PLAY_EVENT, UPDATE_DATA_EVENT, } from '@/lib/events';
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUser, changeShips, data, doPlay, changeGameStatus } from '@/lib/game';

function ioHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as any).server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server((res.socket as any).server);

    io.on('connection', socket => {
      const { name } = socket.handshake.query;
      updateUser(String(name), socket.id);

      io.sockets.emit(UPDATE_DATA_EVENT, data);

      socket.on("disconnect", () => {
        io.sockets.emit(UPDATE_DATA_EVENT, data);
      });

      socket.on(CHANGE_CELLS_EVENT, event => {
        changeShips(event.name, event.body);
        io.sockets.emit(UPDATE_DATA_EVENT, data);
      });

      socket.on(PLAY_EVENT, event => {
        const { target, x, y } = event.body;
        doPlay(target, x, y);
        io.sockets.emit(UPDATE_DATA_EVENT, data);
      });

      socket.on(CHANGE_GAME_STATUS, event => {
        changeGameStatus(!!event.body);
        io.sockets.emit(UPDATE_DATA_EVENT, data);
      });
    });

    (res.socket as any).server.io = io;
  } else {
    (res.socket as any).server.io.sockets.emit(UPDATE_DATA_EVENT, data);
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler;
