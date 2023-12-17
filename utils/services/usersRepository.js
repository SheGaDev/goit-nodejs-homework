const bcrypt = require("bcrypt");
const usersModel = require("../../models/usersModel");
const generateToken = require("../generateToken");

class DatabaseUsersManager {
  /**
   *
   * @param {{email: string, password: string}} data
   * @returns {Promise<{email: string, subscription: string} | null>}
   */
  async create(data) {
    let user = await usersModel.findOne({ email: data.email });
    if (user) return null;
    const hashPassword = bcrypt.hashSync(data.password, 8);
    user = await usersModel.create({
      ...data,
      password: hashPassword,
    });
    return {
      email: user.email,
      subcription: user.subscription,
    };
  }

  /**
   *
   * @param {{email: string, password: string}} data;
   * @returns {Promise<{token: string, user: {email: string, subcription: string}} | null>}
   */
  async login({ email, password }) {
    const user = await usersModel.findOne({ email });
    if (!user || bcrypt.compareSync(password, user.password)) return null;

    const token = generateToken(user._id, user.subscription);

    await user.updateOne({ $set: { token } });

    return {
      token,
      user: {
        email: user.email,
        subcription: user.subscription,
      },
    };
  }

  async logout() {}

  async fetchUser() {}
}

module.exports = DatabaseUsersManager;
