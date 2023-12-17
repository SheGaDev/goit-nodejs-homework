const jwt = require("jsonwebtoken");

/**
 *
 * @param  {[id: string, subscription: string]} args
 * @returns {string} generated token.
 */
function generateToken(...args) {
  const payload = { args };
  console.log(payload);
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
}

module.exports = generateToken;
