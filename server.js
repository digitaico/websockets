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

socketServer.on('connection', (socket) => {
  console.warn(`... a user is connected via websockets id: ${socket.id} `);

  socket.on('ready', () => {
    console.log(`Player ${socket.id} ready!`);

    readyPlayerCount++;

    if (readyPlayerCount % 2 === 0) {
      socketServer.emit('startGame', socket.id);
    }
  })

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData);
  });

  socket.on('ballMove', (ballData) => {
    socket.broadcast.emit('ballMove', ballData);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client ${socket.id} disconnected : ${reason}`);
  });
});
