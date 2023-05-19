require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { globalErrorHandler } = require("./utils/error");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(routes);

  app.get("/ping", (req, res) => {
    res.json({ message: "pong!" });
  });

  app.all("*", (req, res, next) => {
    const err = new Error(`Can't fine ${req.originalUrl} on thies server!`);

    err.statuscode = 404;

    next(err);
  });

  app.use(globalErrorHandler);
  return app;
};

module.exports = { createApp };
