const { Server } = require('ws');
const { v4: uuidv4 } = require('uuid');

const server = new Server(
  {
    port: 5000,
  },
  () => {
    console.log('WebSocket server started on port 5000');
  }
);

server.on('connection', (ws) => {
  // ws.id = uuidv4();
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    console.log('message', message);
    switch (message.event) {
      case 'message': {
        broadcaseMessage(JSON.stringify(message));
        break;
      }
      case 'connection': {
        broadcaseMessage(JSON.stringify(message));
        break;
      }
    }
  });
});

// const message = {
//   event: 'message',
//   id: uuidv4(),
//   date: new Date(),
//   username: 'Max',
//   message: 'привет',
// };

function broadcaseMessage(message) {
  server.clients.forEach((client) => {
    client.send(message);
  });
}
// function broadcaseMessage(message, id) {
//   server.clients.forEach((client) => {
//     if (client.id === id) {
//       client.send(JSON.stringify(message));
//     }
//   });
// }
