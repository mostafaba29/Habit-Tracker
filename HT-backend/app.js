const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const habitRouter = require("./routes/habitRoutes");
const taskRouter = require("./routes/habitRoutes");
const achievementRouter = require("./routes/habitRoutes");

require("./config/passport");

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Request size limiter
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(compression());
app.use(
  cors({
    origin: "http://localhost:3003",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

// Initialize Passport and session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/habits", habitRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/achievements", achievementRouter);

// Google OAuth2 routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false
  }),
  (req, res) => {
    // Successful authentication, redirect home or as needed
    const token = req.user.generateJWT();
    res.cookie("jwtToken", token, {
      httpOnly: true
    });
    res.redirect("http://localhost:5173/home");
  }
);

// Error msg for undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
