const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const _ = require("lodash");
const process = require("process");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes/routes");

app.disable("etag");

app.use(helmet());

app.use(morgan("combined"));

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get("/", (req, res) => {
  res.send(`Xlt boiler plate v.1.0 ${new Date()}`);
});

app.use("/xlt/v1", router);
app.use("/images", express.static("images"));
// Handles all errors
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(err.status || 400).send({
      success: false,
      message: err.message,
      errors: _.get(err, "detail")
    });
  }
  console.error(err);
  return res.status(err.status || 400).send({
    success: false,
    message: err.message,
    details: _.get(err, "parent.detail")
  });
});
process.on("uncaughtException", err => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.log(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
app.use((req, res) => res.status(500).send({ success: false }));

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port: ${process.env.APP_PORT} 🌎`);
});

module.exports = app;
