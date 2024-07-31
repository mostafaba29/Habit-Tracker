const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res
      .status(400)
      .json({ message: "Name and phone number are required" });
  }
  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this phone number already exists" });
  }

  const user = await User.create({
    name,
    phone
  });

  res.status(201).json({ message: "User registered successfully", user });
});

exports.login = catchAsync(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const user = await User.findOne({ phone, active: true });
  if (!user) {
    return res.status(401).json({ message: "User not found or not active" });
  }
  req.session.userId = user._id;

  res.status(200).json({ message: "Login successful", user });
});

exports.logout = catchAsync(async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

exports.getUserPage = catchAsync(async (req, res, next) => {
  const user = await User.find(req.user.phone);

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
