const Task = require("../models/taskModel");
const Achievement = require("../models/achievementModel");

const catchAsync = require("../utils/catchAsync");

exports.getAllUserTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ user: req.user.phone });

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks
    }
  });
});

exports.createTask = catchAsync(async (req, res) => {
  const task = await Task.create(req.body);

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
  const { taskId, date } = req.body;
  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Task not found"
    });
  }

  task.completedDates.push({ date, isCompleted: true });
  await task.save();

  const achievements = await Achievement.findOne({ user: req.user.id });

  if (achievements) {
    achievements.completedTasksCount += 1;
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
      completedTasksCount: 1,
      streakCount: 1,
      lastStreakDate: date,
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
