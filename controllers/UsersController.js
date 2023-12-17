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
      throw new Error("Invalid login or password.");
    }

    res.status(Codes.OK).json({
      code: Codes.OK,
      status: "OK",
      data,
    });
  });

  logout = asyncHandler(async (req, res) => {});

  current = asyncHandler(async (req, res) => {});
}

module.exports = new UsersController();
