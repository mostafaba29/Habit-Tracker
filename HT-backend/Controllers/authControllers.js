const catchAsyc = require("./../utils/catchAsync");
const User = require("./../models/userModel");

exports.signup = catchAsyc(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    user: newUser
  });
});
