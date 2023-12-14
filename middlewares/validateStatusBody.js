const Codes = require("../utils/constants/codeAPI");

module.exports = (req, res, next) => {
  const { favorite } = req.body;
  if (favorite === undefined) {
    res.status(Codes.BAD_REQUEST);
    throw new Error("Missing field favorite.");
  }
  if (typeof favorite !== "boolean") {
    res.status(Codes.BAD_REQUEST);
    throw new Error("`favorite` is not boolean!");
  }
  next();
};
