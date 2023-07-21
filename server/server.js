const { v4: uuidv4 } = require('uuid');
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  // socket.id = uuidv4();

  console.log(`Socket connected: ${socket.id}`);

  socket.on('user_connection', (message) => {
    console.log('message', message);
  });

  socket.on('message', (message, recievedCallback) => {
    recievedCallback();
    console.log('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`WebSocket server started on port ${port}`);
});
