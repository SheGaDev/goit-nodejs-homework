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

    if (!user || !bcrypt.compareSync(password, user.password)) return null;

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

  /**
   *
   * @param {string} id
   * @returns {Promise<{user: { email: string, subcription: string}} | null>}
   */
  async logout(id) {
    const user = await usersModel.findById(id);

    if (!user) return null;

    await user.updateOne({ $set: { token: null } });

    return {
      user: {
        email: user.email,
        subcription: user.subscription,
      },
    };
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<{user: { email: string, subcription: string}, token: string} | null>}
   */
  async fetchUser(id) {
    const user = await usersModel.findById(id);

    if (!user) return null;

    return {
      user: {
        email: user.email,
        subcription: user.subscription,
      },
      token: user.token,
    };
  }

  /**
   *
   * @param {string} id
   * @param {string} subcription
   * @returns {Promise<{ user: {email: string, subcription: string}}>}
   */
  async updateSubscription(id, subcription) {
    const user = await usersModel.findByIdAndUpdate(id, {
      $set: { subscription: subcription },
    });

    return {
      user: {
        email: user.email,
        subcription: user.subscription,
      },
    };
  }
}

module.exports = DatabaseUsersManager;
