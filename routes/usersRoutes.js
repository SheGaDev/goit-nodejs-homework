const UsersController = require("../controllers/UsersController");
const auth = require("../middlewares/auth");
const validateAuthBody = require("../middlewares/validateAuthBody");
const usersSchema = require("../schemas/usersSchema");

const usersRoutes = require("express").Router();

usersRoutes.post(
  "/register",
  validateAuthBody(usersSchema),
  UsersController.register
);

usersRoutes.post("/login", validateAuthBody(usersSchema), UsersController.login);

usersRoutes.patch("/logout", UsersController.logout);

usersRoutes.get("/current", UsersController.current);

module.exports = usersRoutes;
