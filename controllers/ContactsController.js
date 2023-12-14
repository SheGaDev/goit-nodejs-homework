const asyncHandler = require("express-async-handler");
const DatabaseManager = require("../utils/services/contactsRepository");
const { nanoid } = require("nanoid");
const Codes = require("../utils/constants/codeAPI");

class ContactsController {
  constructor() {
    this.DatabaseManager = new DatabaseManager();
  }

  create = asyncHandler(async (req, res) => {
    const contact = await this.DatabaseManager.addContact(req.body);
    if (!contact) {
      res.status(Codes.OK);
      throw new Error("Oops..");
    }

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
    const contact = await this.DatabaseManager.findById(req.params.id);
    if (!contact) {
      res.status(Codes.NOT_FOUND);
      throw new Error("Not Found.");
    }
    res.status(Codes.OK).json({ code: Codes.OK, message: "OK", data: contact });
  });

  updateOne = asyncHandler(async (req, res) => {
    const {
      params: { id },
      body,
    } = req;
    const contact = await this.DatabaseManager.findByIdAndUpdate(id, {
      ...body,
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

  updateStatusContact = asyncHandler(async (req, res) => {
    const {
      params: { id },
      body,
    } = req;
    const contact = await this.DatabaseManager.updateStatusContact(id, body);
    if (!contact) {
      res.status(Codes.NOT_FOUND);
      throw new Error("Not Found.");
    }
    res.status(Codes.OK).json({
      code: Codes.OK,
      message: 'Status "favorite" updated.',
      data: contact,
    });
  });
}

module.exports = new ContactsController();
