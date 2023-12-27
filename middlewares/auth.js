const jwt = require("jsonwebtoken");
const Codes = require("../utils/constants/codeAPI");

module.exports = (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");
    if (type === "Bearer" && token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = { ...decoded.data, token };
      next();
    }
  } catch (_) {
    res
      .status(Codes.UNAUTHORIZED)
      .json({ code: Codes.UNAUTHORIZED, message: "Not authorized." });
  }
};
