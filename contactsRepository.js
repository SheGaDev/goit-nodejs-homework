const { readFile, writeFile } = require("node:fs/promises");
const { join } = require("node:path");

class DatabaseManager {
  constructor() {
    this.databasePath = join(process.cwd(), "db/contacts.json");
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
    await writeFile(this.databasePath, JSON.stringify(list, null, 2));
    return data;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Contact | null>}
   */
  async removeContact(id) {
    const list = await this.fetchContacts();
    const contact = list.find((contact) => contact.id === id);
    if (!contact) return null;
    const data = list.filter((contact) => contact.id !== id);
    await writeFile(this.databasePath, JSON.stringify(data, null, 2));
    return contact;
  }
}

module.exports = DatabaseManager;
