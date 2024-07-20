const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.getUserInfo = catchAsync((req, res) => {
  const user = User.find();
  res.status(200).json({
    status: "success",
    user
  });
});
