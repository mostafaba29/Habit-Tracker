const catchAsync = require("../utils/catchAsync");
const Achievement = require("../models/achievementModel");

exports.getAllAchievements = catchAsync(async (req, res, next) => {
  const achievements = await Achievement.find({ user: req.user.id });

  res.status(200).json({
    status: "success",
    results: achievements.length,
    data: {
      achievements
    }
  });
});
