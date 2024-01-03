const multer = require("multer");
const { join } = require("path");

const multerConfig = multer.diskStorage({
  destination: join(process.cwd(), "tmp"),
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
