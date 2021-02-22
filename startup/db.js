const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  const dbConnectionString = config.get("db");

  mongoose
    .connect(dbConnectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => winston.info(`Connected to ${dbConnectionString}...`));
};
