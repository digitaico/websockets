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

io.on('connection', (socket) => {
  console.warn('... sw a user is connected');
});
