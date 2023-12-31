let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of('/pong');
  io.on('connection', (socket) => {
    console.warn(`... a user is connected via websockets id: ${socket.id} `);

    socket.on('ready', () => {
      console.log(`Player ${socket.id} ready!`);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        io.emit('startGame', socket.id);
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
};

export default listen;