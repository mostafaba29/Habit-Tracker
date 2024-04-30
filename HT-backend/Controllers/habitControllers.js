const Habit = require("./../models/habitModel");
const catchAsync = require("./../utils/catchAsync");

exports.createHabit = catchAsync(async (req, res) => {
  const newHabit = await Habit.create({
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    startTime: req.body.startTime
  });
  res.status(201).json({
    status: "success",
    data: {
      habit: newHabit
    }
  });
});

exports.getAllHabits = catchAsync(async (req, res) => {
  const allHabits = await Habit.find({}).select("-__v");
  res.status(200).json({
    status: "success",
    results: allHabits.length,
    data: {
      habits: allHabits
    }
  });
});

exports.getHabitById = catchAsync(async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      habit
    }
  });
});

exports.updateHabit = catchAsync(async (req, res) => {
  const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedHabit
    }
  });
});

exports.deleteHabit = catchAsync(async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null
  });
});
