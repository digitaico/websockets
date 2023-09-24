import http from 'http';
import {Server as SocketIO} from 'socket.io';
import 'dotenv/config';

import appServer from './app.js';
const httpServer = http.createServer(appServer);
const socketServer = new SocketIO(httpServer);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`... Server listening on port ${PORT}`);
})

//import sockets from './sockets.js';
//sockets.listen(socketServer); // replaces following lines
let readyPlayerCount = 0;
const pongNamespace = socketServer.of('/pong');

pongNamespace.on('connection', (socket) => {
  let room;

  console.warn(`... a user is connected via websockets id: ${socket.id} `);

  socket.on('ready', () => {
    room = `room-${Math.floor(readyPlayerCount / 2)}`;
    socket.join(room);

    console.log(`Player ${socket.id} ready to join room ${room}`);

    readyPlayerCount++;

    if (readyPlayerCount % 2 === 0) {
      pongNamespace.in(room).emit('startGame', socket.id);
    }
  })

  socket.on('paddleMove', (paddleData) => {
    socket.to(room).emit('paddleMove', paddleData);
  });

  socket.on('ballMove', (ballData) => {
    socket.to(room).emit('ballMove', ballData);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client ${socket.id} disconnected : ${reason}`);
    socket.leave(room);
  });
});
