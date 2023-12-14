const ContactsController = require("../controllers/ContactsController");
const validateBody = require("../middlewares/validateBody");
const validateId = require("../middlewares/validateId");
const validateStatusBody = require("../middlewares/validateStatusBody");
const contactsSchema = require("../schemas/contactsSchema");
const contactsRoutes = require("express").Router();

contactsRoutes.get("/contacts", ContactsController.fetchAll);

contactsRoutes.get("/contacts/:id", validateId, ContactsController.findOne);

contactsRoutes.post(
  "/contacts",
  validateBody(contactsSchema),
  ContactsController.create
);

contactsRoutes.delete(
  "/contacts/:id",
  validateId,
  ContactsController.deleteOne
);

contactsRoutes.put("/contacts/:id", validateId, ContactsController.updateOne);

contactsRoutes.patch("/contacts/:id/favorite", validateId, validateStatusBody, ContactsController.updateStatusContact)

module.exports = contactsRoutes;
