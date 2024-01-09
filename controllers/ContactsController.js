const asyncHandler = require("express-async-handler");
const DatabaseContactsManager = require("../utils/services/contactsRepository");
const Codes = require("../utils/constants/codeAPI");

class ContactsController {
  constructor() {
    this.manager = DatabaseContactsManager;
  }
  
  create = asyncHandler(async (req, res) => {
    const contact = await this.manager.addContact({
      ...req.body,
      owner: req.user.id,
    });
    if (!contact) {
      res.status(Codes.BAD_REQUEST);
      throw new Error("Oops..");
    }

    res
      .status(Codes.CREATE)
      .json({ code: Codes.CREATE, message: "OK", data: contact });
  });

  fetchAll = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filter = {
      owner: req.user.id,
    };

    if (favorite) filter.favorite = favorite;

    const contacts = await this.manager.fetchContacts(
      filter,
      limit,
      skip
    );
    if (!contacts) {
      res.status(Codes.NOT_FOUND);
      throw new Error("Unable to fetch");
    }
    res
      .status(Codes.OK)
      .json({ code: Codes.OK, message: "OK", data: contacts });
  });

  findOne = asyncHandler(async (req, res) => {
    const contact = await this.manager.findById(req.params.id);
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
    const contact = await this.manager.findByIdAndUpdate(id, {
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
    const contact = await this.manager.deleteContact(id);
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
    const contact = await this.manager.updateStatusContact(id, body);
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
