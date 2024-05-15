// app.js
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const habitRouter = require("./routes/habitRoutes");

require('./config/passport');

const app = express();

app.use(morgan("dev"));

// Request size limiter
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(compression());
app.use(cors());
app.options("*", cors());

// Initialize Passport and session middleware
app.use(session({
 secret: process.env.SESSION_SECRET || 'random secret',
 resave: false,
 saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/habits", habitRouter);

// Google OAuth2 routes
app.get('/auth/google', passport.authenticate('google',{
    scope:['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: '/login', 
    session: false 
  }), (req, res) => {
    // Successful authentication, redirect home or as needed
    const token = req.user.generateJWT(); // Assuming the generateJWT method is defined in the user model
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.redirect("http://localhost:5173/habits");
  });

// Error msg for undefined routes
app.all("*", (req, res, next) => {
 next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
