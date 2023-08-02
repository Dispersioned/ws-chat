class MockDB {
  data = [];

  constructor(data) {
    if (!Array.isArray(data)) return;
    this.data = data;
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    return this.data.find((item) => item.id === id);
  }

  add(item) {
    this.data.push(item);
  }

  removeById(id) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}

class DataBase {
  messages = new MockDB();
  users = new MockDB();
}

const db = new DataBase();

module.exports = db;
