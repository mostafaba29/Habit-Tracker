const catchAsync = require("../utils/catchAsync");
const Achievement = require("../models/achievementModel");

exports.getAllAchievements = catchAsync(async (req, res) => {
  const achievements = await Achievement.find({ user: req.user._id });
  console.log(req.user);
  res.status(200).json({
    status: "success",
    data: {
      achievements
    }
  });
});
