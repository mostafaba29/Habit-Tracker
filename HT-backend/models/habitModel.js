const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: {
    type: String
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "daily"
  },
  timesPerFrequency: { type: Number },
  occurrencesPerDay: { type: Number },
  time: String,
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
