class MockDB {
  messages = [];

  getAllMessages() {
    return this.messages;
  }

  add(message) {
    this.messages.push(message);
  }

  deleteById(messageId) {
    this.messages.findIndex((msg) => msg.id === messageId);
  }
}

const db = new MockDB();

module.exports = db;
