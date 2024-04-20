const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compressoin = require("compression");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(compressoin());
app.use(cors());
app.options("*", cors());

module.exports = app;
