const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.exceptions.handle(
    new winston.transports.File({ filename: "logs/unhandledExceptions.log" }),
    new winston.transports.Console({ format: winston.format.simple() })
  );

  winston
    .add(new winston.transports.Console({ format: winston.format.simple() }))
    .add(new winston.transports.File({ filename: "logs/logfile.log" }));
};
