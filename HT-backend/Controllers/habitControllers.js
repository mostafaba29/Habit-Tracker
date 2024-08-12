const moment = require("moment");
const Habit = require("../models/habitModel");
const Achievement = require("../models/achievementModel");
const catchAsync = require("../utils/catchAsync");

const getDaysInRange = (startDate, endDate) => {
  const days = [];
  const currentDay = moment(startDate);

  while (currentDay.isSameOrBefore(endDate)) {
    days.push(currentDay.clone());
    currentDay.add(1, "days");
  }

  return days;
};

const createDailyHabits = (habitData, userId) => {
  const daysInRange = getDaysInRange(habitData.startDate, habitData.endDate);
  return daysInRange.map(day => {
    return new Habit({
      ...habitData,
      habitDates: [day.toDate()],
      user: userId
    });
  });
};

const createWeeklyHabits = (habitData, userId, daysOfWeek) => {
  const daysInRange = getDaysInRange(habitData.startDate, habitData.endDate);
  const habits = [];

  daysInRange.forEach(day => {
    if (daysOfWeek.includes(day.format("dddd"))) {
      habits.push(
        new Habit({
          ...habitData,
          habitDates: [day.toDate()],
          user: userId
        })
      );
    }
  });

  return habits;
};

const createMonthlyHabits = (habitData, userId, daysOfMonth) => {
  const daysInRange = getDaysInRange(habitData.startDate, habitData.endDate);
  const habits = [];

  daysOfMonth.forEach(day => {
    daysInRange.forEach(d => {
      if (d.date() === day) {
        habits.push(
          new Habit({
            ...habitData,
            habitDates: [d.toDate()],
            user: userId
          })
        );
      }
    });
  });

  return habits;
};

exports.createHabit = catchAsync(async (req, res) => {
  const {
    title,
    description,
    icon,
    frequency,
    occurrencesPerDay,
    duration,
    daysOfWeek,
    daysOfMonth,
    startDate,
    endDate
  } = req.body;
  const userId = req.user.id;

  const habitData = {
    title,
    description,
    icon,
    frequency,
    occurrencesPerDay,
    duration,
    habitDates: [],
    startDate: moment(startDate).toDate(),
    endDate: moment(endDate).toDate()
  };

  let habits = [];
  if (frequency === "daily") {
    habits = createDailyHabits(habitData, userId);
  } else if (frequency === "weekly" && daysOfWeek) {
    habits = createWeeklyHabits(habitData, userId, daysOfWeek);
  } else if (frequency === "monthly" && daysOfMonth) {
    habits = createMonthlyHabits(habitData, userId, daysOfMonth);
  } else {
    return res
      .status(400)
      .json({ message: "Invalid frequency or missing daysOfWeek/daysOfMonth" });
  }

  await Habit.insertMany(habits);

  res.status(201).json({ message: "Habits created successfully", habits });
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
  const currentDate = new Date();
  const habit = await Habit.findById(habitId);

  if (!habit) {
    return res.status(404).json({
      status: "fail",
      message: "Habit not found"
    });
  }

  habit.completedDates.push({ currentDate, isCompleted: true });
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
    achievements.lastStreakDate = currentDate;
    await achievements.save();
  } else {
    await Achievement.create({
      user: req.user.id,
      completedHabitsCount: 1,
      streakCount: 1,
      lastStreakDate: currentDate,
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
