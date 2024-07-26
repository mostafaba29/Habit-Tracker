const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getUserPage = catchAsync(async (req, res, next) => {
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
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null
  });
});
