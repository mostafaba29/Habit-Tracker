const catchAsync = require("../utils/catchAsync");
const Achievement = require("../models/achievementModel");

exports.getAllAchievements = catchAsync(async (req, res, next) => {
  const achievements = await Achievement.find({ user: req.user });

  res.status(200).json({
    status: "success",
    data: {
      achievements
    }
  });
});
