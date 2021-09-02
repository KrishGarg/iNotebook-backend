const mongoose = require("mongoose");
const { mongoURI } = require("./config.json");

const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully.");
  });
};

module.exports = {
  connectToMongo,
};
