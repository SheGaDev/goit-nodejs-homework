const jwt = require("jsonwebtoken");

/**
 *
 * @param  {[id: string, subscription: string]} args
 * @returns {string} generated token.
 */
function generateToken(...args) {
  const payload = {
    data: { id: args[0], subscription: args[1] },
    author: "Mr. Nobody.",
    sub_author: "Mr. Robot.",
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
}

module.exports = generateToken;
