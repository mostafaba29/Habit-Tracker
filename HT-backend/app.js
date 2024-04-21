const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compressoin = require("compression");
const cors = require("cors");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const habitRouter = require("./routes/habitRoutes");

const app = express();

app.use(morgan("dev"));

//request size limiter
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(compressoin());
app.use(cors());
app.options("*", cors());

//Routes
app.use("api/v1/users", userRouter);
app.use("api/v1/habits", habitRouter);

//error msg for undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
