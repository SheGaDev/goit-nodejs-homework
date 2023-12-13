const asyncHandler = require("express-async-handler");
const DatabaseManager = require("../utils/services/contactsRepository");
const { nanoid } = require("nanoid");
const Codes = require("../utils/constants/codeAPI");

class ContactsController {
  constructor() {
    this.DatabaseManager = new DatabaseManager();
  }

  create = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    const data = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contact = await this.DatabaseManager.addContact(data);
    res
      .status(Codes.CREATE)
      .json({ code: Codes.CREATE, message: "OK", data: contact });
  });

  fetchAll = asyncHandler(async (_, res) => {
    const contacts = await this.DatabaseManager.fetchContacts();
    if (!contacts) {
      res.status(Codes.NOT_FOUND);
      throw new Error("Unable to fetch");
    }
    res
      .status(Codes.OK)
      .json({ code: Codes.OK, message: "OK", data: contacts });
  });

  findOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await this.DatabaseManager.findById(id);
    if (!contact) {
      res.status(Codes.NOT_FOUND);
      throw new Error("Not Found.");
    }
    res.status(Codes.OK).json({ code: Codes.OK, message: "OK", data: contact });
  });

  updateOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await this.DatabaseManager.findByIdAndUpdate(id, {
      ...req.body,
    });
    if (!contact) {
      res.status(Codes.NOT_FOUND);
      throw new Error("Not Found.");
    }
    res.status(Codes.OK).json({ code: Codes.OK, message: "OK", data: contact });
  });

  deleteOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await this.DatabaseManager.deleteContact(id);
    if (!contact) {
      res.status(Codes.NOT_FOUND);
      throw new Error("Not Found.");
    }
    res.status(Codes.OK).json({
      code: Codes.OK,
      message: "OK",
      data: contact,
    });
  });
}

module.exports = new ContactsController();
