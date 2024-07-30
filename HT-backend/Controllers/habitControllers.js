const {
  format,
  addDays,
  addWeeks,
  addMonths,
  startOfToday,
  endOfMonth,
  differenceInCalendarDays
} = require("date-fns");
const Habit = require("../models/habitModel");
const Achievement = require("../models/achievementModel");
const catchAsync = require("../utils/catchAsync");

const generateHabitDates = (frequency, timesPerFrequency) => {
  const dates = [];
  const today = startOfToday();
  const endMonth = endOfMonth(today);

  if (frequency === "daily") {
    for (
      let date = today;
      differenceInCalendarDays(endMonth, date) >= 0;
      date = addDays(date, 1)
    ) {
      dates.push(date);
    }
  } else if (frequency === "weekly") {
    const weekdays = [...Array(7).keys()].slice(0, timesPerFrequency);
    for (
      let date = today;
      differenceInCalendarDays(endMonth, date) >= 0;
      date = addWeeks(date, 1)
    ) {
      weekdays.forEach(day => dates.push(addDays(date, day)));
    }
  } else if (frequency === "monthly") {
    const daysInMonth = differenceInCalendarDays(endMonth, today) + 1;
    // eslint-disable-next-line no-plusplus
    for (let day = 1; day <= daysInMonth; day++) {
      if (day % Math.floor(daysInMonth / timesPerFrequency) === 0) {
        dates.push(addDays(today, day - 1));
      }
    }
  }
  return dates;
};

exports.getAllUserHabits = catchAsync(async (req, res) => {
  //   const habits = await Habit.find({ user: req.user.id });

  //   res.status(200).json({
  //     status: "success",
  //     results: habits.length,
  //     data: {
  //       habits
  //     }
  //   });
  // });

  // exports.createHabit = catchAsync(async (req, res) => {
  //   req.body.user = req.user.id;
  //   const habit = await Habit.create(req.body);

  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       habit
  //     }
  //   });
  const {
    name,
    frequency,
    timesPerFrequency,
    occurrencesPerDay,
    duration,
    startTime
  } = req.body;

  const habitDates = generateHabitDates(frequency, timesPerFrequency);
  const habits = habitDates.map(date => ({
    name,
    frequency,
    timesPerFrequency,
    occurrencesPerDay,
    duration,
    startTime: new Date(
      date.setHours(
        new Date(startTime).getHours(),
        new Date(startTime).getMinutes()
      )
    ),
    user: req.user._id
  }));

  const createdHabits = await Habit.insertMany(habits);

  res.status(201).json({ status: "success", data: createdHabits });
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
