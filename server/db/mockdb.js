class MockDB {
  data = [];

  constructor(data) {
    if (!Array.isArray(data)) return;
    this.data = data;
  }

  findAll() {
    return this.data;
  }

  findById(id) {
    return this.data.find((item) => item.id === id);
  }

  add(item) {
    this.data.push(item);
  }

  removeById(id) {
    this.data = this.data.filter((item) => item.id !== id);
  }

  updateById(id, data) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('not found');

    this.data[index] = data;
  }
}

class DataBase {
  messages = new MockDB();
  users = new MockDB();
}

const db = new DataBase();

module.exports = db;
