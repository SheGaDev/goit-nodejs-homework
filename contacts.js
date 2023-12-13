const DatabaseManager = require("./src/services/contactsRepository.js");

class ContactsManager {
  constructor() {
    this.DatabaseManager = new DatabaseManager();
  }

  /**
   * @returns {Promise<Contact[]>} List contacts
   */
  async listContacts() {
    const list = await this.DatabaseManager.fetchContacts();
    return list;
  }

  /**
   * @param {string} id
   * @returns {Promise<Contact | null>} Contact or null;
   */
  async getContactById(id) {
    const list = await this.listContacts();
    return list.find((contact) => contact.id === id) ?? null;
  }

  /**
   * @param {string} id
   * @returns {Promise<Contact | null>} Deleted contact
   */
  async removeContact(id) {
    const data = await this.DatabaseManager.removeContact(id);
    return data;
  }

  /**
   * @param {Contact} contact
   * @returns {Contact} Created contact
   */
  async addContact(contact) {
    const newContact = await this.DatabaseManager.addContact(contact);
    return newContact;
  }
}

module.exports = ContactsManager;
