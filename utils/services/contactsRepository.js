const { nanoid } = require("nanoid");
const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");

class DatabaseManager {
  constructor() {
    this.databasePath = join(process.cwd(), "db", "contacts.json");
  }

  /**
   *
   * @param {Contact[]} data
   */
  async writeDb(data) {
    await writeFile(this.databasePath, JSON.stringify(data, null, 2));
  }
  /**
   *
   * @returns {Promise<Contact[]>}
   */
  async fetchContacts() {
    const data = await readFile(this.databasePath);
    return JSON.parse(data);
  }

  /**
   *
   * @param {Contact} data
   * @returns {Promise<Contact>}
   */
  async addContact(data) {
    const list = await this.fetchContacts();
    list.push(data);
    await this.writeDb(list);
    return data;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Contact | null>}
   */
  async findById(id) {
    const list = await this.fetchContacts();
    return list.find((contact) => contact.id === id) ?? null;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Contact | null>}
   */
  async deleteContact(id) {
    const list = await this.fetchContacts();
    const contact = list.find((contact) => contact.id === id);
    if (!contact) return null;
    const data = list.filter((contact) => contact.id !== id);
    await this.writeDb(data);
    return contact;
  }

  /**
   *
   * @param {string} id
   * @param {Contact} data
   * @returns {Promise<Contact | null>}
   */
  async findByIdAndUpdate(id, data) {
    const list = await this.fetchContacts();
    const contactIndex = list.findIndex((contact) => contact.id === id);
    if (contactIndex === -1) return null;
    list[contactIndex] = { ...list[contactIndex], ...data };
    await this.writeDb(list);
    return list[contactIndex];
  }
}

module.exports = DatabaseManager;
