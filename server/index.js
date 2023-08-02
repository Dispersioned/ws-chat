const { v4: uuidv4 } = require('uuid');

const { PORT } = require('./config');
const { log } = require('./logger');

const server = require('http').createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const onConnection = (socket) => {
  log('User connected');

  const { roomId } = socket.handshake.query;
  socket.roomId = roomId;

  socket.join(roomId);


  socket.on('disconnect', () => {
    log('User disconnected');
    socket.leave(roomId);
  });
};

io.on('connection', onConnection);

server.listen(PORT, () => {
  console.log(`WebSocket server started on port ${PORT}`);
});
