const catchAsync = require("../utils/catchAsync");
const Habit = require("../models/habitModel");

exports.createHabit = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const newHabit = new Habit({
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    startTime: req.body.startTime,
    frequency: req.body.frequency,
    done: false,
    user: userId
  });
  await newHabit.save();
  res.status(200).json({
    status: "success",
    newHabit
  });
});

exports.getAllUserHabits = catchAsync(async (req, res) => {
  const habits = await Habit.find();
  res.status(200).json({
    status: "success",
    results: habits.length,
    userHabits: habits
  });
});

exports.getOneHabit = catchAsync(async (req, res) => {
  const habitID = req.params.id;
  const habit = await Habit.findById(habitID);
  res.status(200).json({
    status: "success",
    habit
  });
});

exports.updateHabit = catchAsync(async (req, res) => {
  const habitID = req.params.id;
  const updatedHabit = await Habit.findByIdAndUpdate(habitID, {
    newName: req.body.name,
    newDescription: req.body.description,
    newDuration: req.body.duration,
    newStartTime: req.body.startTime,
    newFrequency: req.body.frequency,
    Done: req.body.done
  });
  res.status(200).json({
    status: "updated",
    updatedHabit
  });
});

exports.deleteHabit = catchAsync(async (req, res) => {
  const habitID = req.params.id;
  Habit.findByIdAndDelete(habitID);
  res.status(200).json(null);
});
