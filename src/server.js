const { join } = require("path");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("morgan");
const cors = require("cors");
const Codes = require("./utils/constants/codeAPI");

const configPath = join(__dirname, "config", ".env");
require("dotenv").config({ path: configPath });

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(cors());

app.use("/api/", require("./routes/contactsRoutes"));

app.use(errorHandler);
app.use((req, res) => {
  res
    .status(Codes.NOT_FOUND)
    .json({ code: Codes.NOT_FOUND, message: "Not found." });
});

app.listen(process.env.PORT, () => {
  console.log(`Listen on port: ${process.env.PORT}`);
});
