const Task = require("../models/taskModel");
const User = require("../models/userModel");
const Achievement = require("../models/achievementModel");

const catchAsync = require("../utils/catchAsync");

exports.getAllUserTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  console.log(tasks);
  if (tasks.length === 0) {
    return res.status(404).json({
      message: "No tasks found for this user"
    });
  }

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks
    }
  });
});

exports.createTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { title, description, priority, time } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const task = await Task.create({
    title,
    description,
    priority,
    time,
    user: user._id
  });

  res.status(201).json({
    status: "success",
    task
  });
});

exports.getOneTask = catchAsync(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Task not found"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      task
    }
  });
});

exports.updateTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Task not found"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      task
    }
  });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Task not found"
    });
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});

exports.completeTask = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const currentDate = new Date();
  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Task not found"
    });
  }

  task.completedDates.push({ date: currentDate, isCompleted: true });
  await task.save();

  const achievements = await Achievement.findOne({ user: req.user.id });

  if (achievements) {
    achievements.completedTasksCount += 1;
    if (
      achievements.lastStreakDate &&
      achievements.lastStreakDate.toDateString() ===
        new Date(currentDate.setDate(currentDate.getDate() - 1)).toDateString()
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
      completedTasksCount: 1,
      streakCount: 1,
      lastStreakDate: currentDate,
      hotStreak: 1
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      task
    }
  });
});
