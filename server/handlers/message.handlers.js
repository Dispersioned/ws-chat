const db = require('../db/mockdb');
const { v4: uuidv4 } = require('uuid');

function setupHandlers(io, socket) {
  function sendMessages() {
    const messages = db.messages.findAll();
    io.in(socket.roomId).emit('messages', messages);
  }

  function addMessage(message) {
    db.messages.add({
      id: uuidv4(),
      createdAt: new Date(),
      userId: message.userId,
      username: message.username,
      text: message.text,
    });

    sendMessages();
  }

  function removeMessage(messageId) {
    db.messages.removeById(messageId);

    sendMessages();
  }

  socket.on('message:get', sendMessages);
  socket.on('message:add', addMessage);
  socket.on('message:remove', removeMessage);
}

module.exports = setupHandlers;
