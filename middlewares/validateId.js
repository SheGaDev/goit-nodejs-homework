const { isValidObjectId } = require("mongoose");
const Codes = require("../utils/constants/codeAPI");

module.exports = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(Codes.BAD_REQUEST);
    throw new Error(`ID is not valid.`);
  }
  next();
};
