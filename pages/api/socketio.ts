import { Server } from 'socket.io';
import { addUser, removeUser, getUsers } from '@/lib/users'
import {
  MYSHIPS_UPDATE_EVENT,
  REFRESH_MYSHIPS_UPDATE_EVENT,
  USERS_UPDATE_EVENT,
} from '@/lib/events';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getMyShips, setMyShips } from '@/lib/game';

function ioHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as any).server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server((res.socket as any).server);

    io.on('connection', socket => {
      console.log(`${socket.id} connected`);
      const { name } = socket.handshake.query;

      const users = getUsers();
      // si es nuevo user, lo agrega
      if (!users.find(r => r.name === name)) {
        addUser(socket.id, String(name));
      }

      io.emit(USERS_UPDATE_EVENT, users);

      socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit(USERS_UPDATE_EVENT, users);
      });

      socket.on(MYSHIPS_UPDATE_EVENT, event => {
        console.log('MYSHIPS_UPDATE_EVENT')
        setMyShips(event.body);
        socket.emit(REFRESH_MYSHIPS_UPDATE_EVENT, event.body);
      });
    });

    (res.socket as any).server.io = io;
  } else {
    console.log('socket.io already running');
    (res.socket as any).server.io.emit(USERS_UPDATE_EVENT, getUsers());
    (res.socket as any).server.io.emit(REFRESH_MYSHIPS_UPDATE_EVENT, getMyShips());
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler;
