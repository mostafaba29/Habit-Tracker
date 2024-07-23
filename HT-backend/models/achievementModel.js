const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  streakCount: {
    type: Number,
    default: 0
  },
  lastStreakDate: {
    type: Date
  },
  completedTasksCount: {
    type: Number,
    default: 0
  },
  completedHabitsCount: {
    type: Number,
    default: 0
  }
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
