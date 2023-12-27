const ContactsController = require("../controllers/ContactsController");
const auth = require("../middlewares/auth");
const validateBody = require("../middlewares/validateBody");
const validateId = require("../middlewares/validateId");
const validateStatusBody = require("../middlewares/validateStatusBody");
const contactsSchema = require("../schemas/contactsSchema");
const contactsRoutes = require("express").Router();

contactsRoutes.get("/contacts", auth, ContactsController.fetchAll);

contactsRoutes.get(
  "/contacts/:id",
  auth,
  validateId,
  ContactsController.findOne
);

contactsRoutes.post(
  "/contacts",
  auth,
  validateBody(contactsSchema),
  ContactsController.create
);

contactsRoutes.delete(
  "/contacts/:id",
  auth,
  validateId,
  ContactsController.deleteOne
);

contactsRoutes.put(
  "/contacts/:id",
  auth,
  validateId,
  ContactsController.updateOne
);

contactsRoutes.patch(
  "/contacts/:id/favorite",
  auth,
  validateId,
  validateStatusBody,
  ContactsController.updateStatusContact
);

module.exports = contactsRoutes;
