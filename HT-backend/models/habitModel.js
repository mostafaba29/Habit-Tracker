const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ["repeated", "timeBased", "oneTime"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "daily"
  },
  targetCount: {
    type: Number,
    default: 1
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  completedDates: [
    {
      date: Date,
      isCompleted: Boolean
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
