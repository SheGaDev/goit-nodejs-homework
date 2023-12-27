const asyncHandler = require("express-async-handler");
const DatabaseUsersManager = require("../utils/services/usersRepository");
const Codes = require("../utils/constants/codeAPI");

class UsersController {
  constructor() {
    this.DatabaseManager = new DatabaseUsersManager();
  }

  register = asyncHandler(async (req, res) => {
    const user = await this.DatabaseManager.create(req.body);
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
}

module.exports = new UsersController();
