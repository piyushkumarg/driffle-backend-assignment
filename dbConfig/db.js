const mongoose = require("mongoose");

require("dotenv").config();
const dbURL = process.env.MONGODB_URL;
const dbConnect = async () => {
  mongoose
    .connect(dbURL)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((error) => {
      console.error(`Unable to connect to MongoDB: ${error}`);
    });
};

module.exports = dbConnect;
