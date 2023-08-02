const { v4: uuidv4 } = require('uuid');

const { PORT } = require('./config');

const server = require('http').createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

server.listen(PORT, () => {
  console.log(`WebSocket server started on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('user_connected', (message) => {
    console.log('user joined', message);
    io.emit('message', message);
  });

  socket.on('user_disconnected', (message) => {
    console.log('user left', message);
    io.emit('message', message);
  });

  socket.on('message', (message, recievedCallback) => {
    recievedCallback();
    console.log('message', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});
