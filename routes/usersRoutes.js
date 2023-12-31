const UsersController = require("../controllers/UsersController");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const validateBody = require("../middlewares/validateBody");
const { usersSchema, avatarsSchema } = require("../schemas/usersSchema");

const usersRoutes = require("express").Router();

usersRoutes.post(
  "/register",
  validateBody(usersSchema),
  UsersController.register
);

usersRoutes.post("/login", validateBody(usersSchema), UsersController.login);

usersRoutes.patch("/logout", auth, UsersController.logout);

usersRoutes.get("/current", auth, UsersController.current);

usersRoutes.patch(
  "/avatars",
  auth,
  upload.single("avatarURL"),
  validateBody(avatarsSchema),
  UsersController.updateAvatar
);

module.exports = usersRoutes;
