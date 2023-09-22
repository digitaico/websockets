import http from 'http';
import 'dotenv/config';
import app from './app.js';
import {Server as SocketIO} from 'socket.io';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new SocketIO(server);

server.listen(PORT, () => {
  console.log(`... Server listening on port ${PORT}`);
})

let readyPlayerCount = 0;

io.on('connection', (socket) => {
  console.warn(`... a user is connected via websockets id: ${socket.id} `);

  socket.on('ready', () => {
    console.log(`Player ${socket.id} ready!`);

    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      io.emit('startGame', socket.id);
    }
  })
});
