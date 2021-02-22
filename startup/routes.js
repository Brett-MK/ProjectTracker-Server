const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const error = require("../middleware/error");
const tasks = require("../routes/tasks");
const projects = require("../routes/projects");

module.exports = function (app) {
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    winston.info("Morgan enabled...");
  }

  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use("/api/tasks", tasks);
  app.use("/api/projects", projects);
  app.use(error);
};
