const asyncHandler = require("express-async-handler");
const DatabaseUsersManager = require("../utils/services/usersRepository");
const Codes = require("../utils/constants/codeAPI");
const gravatar = require("gravatar");
const { join } = require("path");
const Jimp = require("jimp");

class UsersController {
  constructor() {
    this.DatabaseManager = new DatabaseUsersManager();
  }

  register = asyncHandler(async (req, res) => {
    const avatarURL = gravatar.url(req.body.email);
    const user = await this.DatabaseManager.create({ ...req.body, avatarURL });
    if (!user) {
      res.status(Codes.CONFLICT);
      throw new Error("User already exists.");
    }
    res.status(Codes.CREATE).json({
      code: Codes.CREATE,
      status: "Created",
      data: {
        user,
      },
    });
  });

  login = asyncHandler(async (req, res) => {
    const data = await this.DatabaseManager.login(req.body);

    if (!data) {
      res.status(Codes.BAD_REQUEST);
      throw new Error("Email or password is wrong.");
    }

    res.status(Codes.OK).json({
      code: Codes.OK,
      status: "OK",
      data,
    });
  });

  logout = asyncHandler(async (req, res) => {
    const user = await this.DatabaseManager.logout(req.user.id);

    if (!user) {
      res.status(Codes.UNAUTHORIZED);
      throw new Error("Not authorized.");
    }

    res.status(Codes.NO_CONTENT).json({
      code: Codes.NO_CONTENT,
      message: "No Content.",
    });
  });

  current = asyncHandler(async (req, res) => {
    const data = await this.DatabaseManager.fetchUser(req.user.id);
    if (!data || data.token !== req.user.token) {
      res.status(Codes.UNAUTHORIZED);
      throw new Error("Not authorized.");
    }
    res
      .status(Codes.OK)
      .json({ code: Codes.OK, status: "OK", data: { ...data.user } });
  });

  updateSubscriptionUser = asyncHandler(async (req, res) => {
    const data = await this.DatabaseManager.fetchUser(req.user.id);
    if (!data || data.token !== req.user.token) {
      res.status(Codes.UNAUTHORIZED);
      throw new Error("Not authorized.");
    }

    const updatedData = await this.DatabaseManager.updateSubscription(
      data.id,
      req.body.subscription
    );

    res.status(Codes.OK).json({
      code: Codes.OK,
      message: "OK",
      data: {
        ...updatedData,
      },
    });
  });

  updateAvatar = asyncHandler(async (req, res) => {
    const data = await this.DatabaseManager.fetchUser(req.user.id, true);

    if (!data || data.token !== req.user.token) {
      res.status(Codes.UNAUTHORIZED);
      throw new Error("Not authorized.");
    }

    const { path: tmpFile, originalname } = req.file;

    const login = data.user.email.split("@")[0];
    const imageName = `${login}_${originalname}`;

    const absolutePath = join("public", "avatars", imageName);
    const publicPath = join("avatars", imageName);

    const image = await Jimp.read(tmpFile);
    image.resize(250, 250);
    image.write(absolutePath);

    const updatedData = await this.DatabaseManager.updateAvatar(
      req.user.id,
      publicPath
    );
    res.status(Codes.OK).json({
      code: Codes.OK,
      status: "OK",
      data: { ...updatedData },
    });
  });
}

module.exports = new UsersController();
