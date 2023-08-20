import { Server } from 'socket.io';
import { CHANGE_SHIPS_EVENT, UPDATE_DATA_EVENT, } from '@/lib/events';
import type { NextApiRequest, NextApiResponse } from 'next';
import { addUser, changeShips, data, removeUser } from '@/lib/game';

function ioHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as any).server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server((res.socket as any).server);

    io.on('connection', socket => {
      console.log(`${socket.id} connected`);
      const { name } = socket.handshake.query;

      addUser(socket.id, String(name));
      io.emit(UPDATE_DATA_EVENT, data);

      socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log("removeUser", socket.id)
        io.emit(UPDATE_DATA_EVENT, data);
      });

      socket.on(CHANGE_SHIPS_EVENT, event => {
        console.log('CHANGE_SHIPS_EVENT');
        changeShips(socket.id, event.body);
        socket.emit(UPDATE_DATA_EVENT, data);
      });
    });

    (res.socket as any).server.io = io;
  } else {
    console.log('socket.io already running');
    (res.socket as any).server.io.emit(UPDATE_DATA_EVENT, data);
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler;
