const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.signup = catchAsync(async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ message: "All these fields are required" });
  }

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this phone number already exists" });
  }

  const user = await User.create({
    name,
    phone,
    password
  });

  res.status(201).json({ message: "User registered successfully", user });
});

exports.login = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ message: "Phone number and password are required" });
  }

  const user = await User.findOne({ phone, active: true });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect phone or password", 401));
  }
  req.session.userId = user._id;

  res.status(200).json({ message: "Login successful", user });
});

exports.logout = catchAsync(async (req, res) => {
  req.session = null;
  res.status(200).json({ message: "Logout successful" });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findAndUpdate(req.user.phone, { active: false });

  res.status(204).json({
    status: "success",
    data: null
  });
});
