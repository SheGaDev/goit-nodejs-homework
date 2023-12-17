const Codes = require("../utils/constants/codeAPI");

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(Codes.BAD_REQUEST).json({
        code: Codes.BAD_REQUEST,
        message: "Please provide all fields.",
      });
    }
    next();
  };
};
