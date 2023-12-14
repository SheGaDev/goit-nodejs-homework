const { connect } = require("mongoose");
const {
  exit,
  env: { LOGIN, PASSWORD, HOST, COLLECTION },
} = process;

const connectDb = async () => {
  try {
    await connect(`mongodb+srv://${LOGIN}:${PASSWORD}@${HOST}/${COLLECTION}`);
    console.log("Database connection successful");
  } catch (err) {
    console.log(err);
    exit(1);
  }
};

module.exports = connectDb;
