const moment = require("moment");
const Habit = require("../models/habitModel");
const Achievement = require("../models/achievementModel");
const catchAsync = require("../utils/catchAsync");

const generateHabitDates = (frequency, startDate, endDate, days = []) => {
  const habitDates = [];
  // Clone the start date and set it to the start of the day UTC
  const currentDate = moment
    .utc(startDate)
    .startOf("day")
    .clone();
  const endMoment = moment.utc(endDate).endOf("day"); // Set the end date to the end of the day UTC

  if (!Array.isArray(days)) {
    days = [];
  }

  // Loop until the currentDate is after the end date
  while (currentDate.isSameOrBefore(endMoment, "day")) {
    if (frequency === "daily") {
      habitDates.push(currentDate.toDate());
    } else if (
      frequency === "weekly" &&
      days.includes(currentDate.format("dddd").toLowerCase())
    ) {
      habitDates.push(currentDate.toDate());
    } else if (frequency === "monthly" && days.includes(currentDate.date())) {
      habitDates.push(currentDate.toDate());
    }
    currentDate.add(1, "day");
  }

  return habitDates;
};

exports.createHabit = catchAsync(async (req, res) => {
  const {
    title,
    description,
    icon,
    frequency,
    occurrencesPerDay,
    duration,
    habitDates,
    startDate,
    endDate
  } = req.body;
  const userId = req.user.id;

  if (
    (frequency === "weekly" || frequency === "monthly") &&
    (!habitDates || habitDates.length === 0)
  ) {
    return res.status(400).json({
      message: "habitDates are required for weekly and monthly frequency"
    });
  }

  // Generate habit dates
  const generatedHabitDates = generateHabitDates(
    frequency,
    moment
      .utc(startDate)
      .startOf("day")
      .toISOString(),
    moment
      .utc(endDate)
      .endOf("day")
      .toISOString(),
    habitDates
  );

  // Ensure the startDate and endDate cover the entire day in UTC
  const habitData = {
    title,
    description,
    icon,
    frequency,
    occurrencesPerDay,
    duration,
    habitDates: generatedHabitDates,
    startDate: moment
      .utc(startDate)
      .startOf("day")
      .toDate(),
    endDate: moment
      .utc(endDate)
      .endOf("day")
      .toDate(),
    user: userId,
    streak: 0,
    completedDates: []
  };

  const habit = await Habit.create(habitData);

  res.status(201).json({
    message: "Habits created successfully",
    habit
  });
});

exports.getAllUserHabits = catchAsync(async (req, res) => {
  const { date } = req.query;
  let filter = { user: req.user._id };

  if (date) {
    const specificDate = new Date(date);
    filter = { ...filter, habitDates: specificDate };
  }

  const habits = await Habit.find(filter);

  res.status(200).json({
    status: "success",
    results: habits.length,
    data: {
      habits
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
  const { habitId } = req.body;
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const habit = await Habit.findById(habitId);

  if (!habit) {
    return res.status(404).json({
      status: "fail",
      message: "Habit not found"
    });
  }

  const isScheduledForToday = habit.habitDates.some(
    date => new Date(date).setHours(0, 0, 0, 0) === currentDate
  );

  if (!isScheduledForToday) {
    return res.status(400).json({
      status: "fail",
      message: "This habit is not scheduled for today."
    });
  }

  // Check if the habit has already been marked as completed for today
  const alreadyCompletedToday = habit.completedDates.some(
    completed => new Date(completed.date).setHours(0, 0, 0, 0) === currentDate
  );

  if (alreadyCompletedToday) {
    return res.status(400).json({
      status: "fail",
      message: "This habit has already been completed today."
    });
  }

  // Mark the habit as complete for today
  habit.completedDates.push({ date: new Date(), isCompleted: true });
  await habit.save();

  const achievements = await Achievement.findOne({ user: req.user.id });

  if (achievements) {
    achievements.completedHabitsCount += 1;
    if (
      achievements.lastStreakDate &&
      achievements.lastStreakDate.toDateString() ===
        new Date(currentDate - 1).toDateString()
    ) {
      achievements.streakCount += 1;
    } else {
      achievements.streakCount = 1;
    }
    achievements.lastStreakDate = new Date();
    await achievements.save();
  } else {
    await Achievement.create({
      user: req.user.id,
      completedHabitsCount: 1,
      streakCount: 1,
      lastStreakDate: new Date(),
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
