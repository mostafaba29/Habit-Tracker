const Habit = require("../models/habitModel");
const Achievement = require("../models/achievementModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUserHabits = catchAsync(async (req, res) => {
  const habits = await Habit.find({ user: req.user.id });

  res.status(200).json({
    status: "success",
    results: habits.length,
    data: {
      habits
    }
  });
});

exports.createHabit = catchAsync(async (req, res) => {
  req.body.user = req.user.id;
  const habit = await Habit.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      habit
    }
  });
});

exports.getOneHabit = catchAsync(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    return res.status(404).json({
      status: "fail",
      message: "Habit not found"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      habit
    }
  });
});

exports.updateHabit = catchAsync(async (req, res) => {
  const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!habit) {
    return res.status(404).json({
      status: "fail",
      message: "Habit not found"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      habit
    }
  });
});

exports.deleteHabit = catchAsync(async (req, res) => {
  const habit = await Habit.findByIdAndDelete(req.params.id);

  if (!habit) {
    return res.status(404).json({
      status: "fail",
      message: "Habit not found"
    });
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});

exports.completeHabit = catchAsync(async (req, res, next) => {
  const { habitId, date } = req.body;
  const habit = await Habit.findById(habitId);

  if (!habit) {
    return res.status(404).json({
      status: "fail",
      message: "Habit not found"
    });
  }

  habit.completedDates.push({ date, isCompleted: true });
  await habit.save();

  const achievements = await Achievement.findOne({ user: req.user.id });

  if (achievements) {
    achievements.completedHabitsCount += 1;
    if (
      achievements.lastStreakDate &&
      achievements.lastStreakDate.toDateString() ===
        new Date(date - 1).toDateString()
    ) {
      achievements.streakCount += 1;
    } else {
      achievements.streakCount = 1;
    }
    achievements.lastStreakDate = date;
    achievements.hotStreak = Math.max(
      achievements.hotStreak,
      achievements.streakCount
    );
    await achievements.save();
  } else {
    await Achievement.create({
      user: req.user.id,
      completedHabitsCount: 1,
      streakCount: 1,
      lastStreakDate: date,
      hotStreak: 1
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      habit
    }
  });
});
