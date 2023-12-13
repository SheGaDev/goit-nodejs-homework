const Codes = require("../utils/constants/codeAPI");
const isValidId = require("../utils/isValidId");

module.exports = (req, res, next) => {
  if (!isValidId(req.params.id)) {
    res.status(Codes.BAD_REQUEST);
    throw new Error(`ID is not valid.`);
  }
  next();
};
