const db = require('../db/mockdb');
const { v4: uuidv4 } = require('uuid');

function setupHandlers(io, socket) {
  function sendUsers() {
    const users = db.users.getAll();
    io.in(socket.roomId).emit('messages', users);
  }

  function addUser(newUser) {
    const user = db.users.getById(newUser.id);

    if (!user) {
      db.users.add({ ...user, online: true });
    } else {
      db.users.updateById(user.id, { ...user, online: true });
    }

    sendUsers();
  }

  function removeMessage(messageId) {
    db.messages.removeById(messageId);

    sendMessages();
  }

  socket.on('message:get', sendMessages);
  socket.on('message:add', addUser);
  socket.on('message:remove', removeMessage);
}

module.exports = setupHandlers;
