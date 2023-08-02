const db = require('../db/mockdb');
const { v4: uuidv4 } = require('uuid');

function setupHandlers(io, socket) {
  function sendUsers() {
    const users = db.users.findAll();
    io.in(socket.roomId).emit('messages', users);
  }

  function addUser(userDto) {
    const user = db.users.findById(userDto.id);

    if (!user) {
      db.users.add({ ...userDto, online: true });
    } else {
      db.users.updateById(user.id, { ...user, online: true });
    }

    sendUsers();
  }

  function removeUser(messageId) {
    db.messages.removeById(messageId);

    sendUsers();
  }

  socket.on('user:get', sendUsers);
  socket.on('user:add', addUser);
  socket.on('user:leave', removeUser);
}

module.exports = setupHandlers;
