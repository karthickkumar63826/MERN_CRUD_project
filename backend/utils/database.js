const mongoose = require("mongoose");

const connectionDB = (url) => {
  console.log("trying to connect database");
  return mongoose.connect(url);
};

module.exports = connectionDB;
