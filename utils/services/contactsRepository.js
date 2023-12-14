const contactsModel = require("../../models/contactsModel");

class DatabaseManager {
  /**
   *
   * @returns {Promise<Contact[]>}
   */
  async fetchContacts() {
    const data = await contactsModel.find({});
    return data ?? null;
  }

  /**
   *
   * @param {Contact} data
   * @returns {Promise<Contact>}
   */
  async addContact(data) {
    const contact = await contactsModel.create(data);
    return contact ?? null;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Contact | null>}
   */
  async findById(id) {
    const contact = await contactsModel.findById(id);
    return contact ?? null;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Contact | null>}
   */
  async deleteContact(id) {
    const contact = await contactsModel.findByIdAndDelete(id);
    return contact ?? null;
  }

  /**
   *
   * @param {string} id
   * @param {Contact} data
   * @returns {Promise<Contact | null>}
   */
  async findByIdAndUpdate(id, data) {
    const contact = await contactsModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true }
    );
    return contact ?? null;
  }

  /**
   *
   * @param {string} id
   * @param {Contact} data
   * @returns {Promise<Contact | null>}
   */
  async updateStatusContact(id, data) {
    const contact = await contactsModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true }
    );
    return contact ?? null;
  }
}

module.exports = DatabaseManager;
