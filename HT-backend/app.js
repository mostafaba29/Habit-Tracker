const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const habitRouter = require("./routes/habitRoutes");
const taskRouter = require("./routes/taskRoutes");
const achievementRouter = require("./routes/achievementRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["secret-secret-key1"],
    maxAge: 24 * 60 * 60 * 1000 * 30,
    secure: false,
    httpOnly: true
  })
);

// Request size limiter
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(compression());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/habits", habitRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/achievements", achievementRouter);

// Error msg for undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
