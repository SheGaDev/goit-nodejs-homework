const Codes = require("../utils/constants/codeAPI");

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      req.file.fieldname === "avatarURL" ? { avatarURL: req.file } : req.body
    );
    if (error) {
      res.status(Codes.BAD_REQUEST);
      throw new Error("Missing required name field.");
    }
    next();
  };
};
