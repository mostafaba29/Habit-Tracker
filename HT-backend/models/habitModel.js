const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  icon: String,
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "daily"
  },
  timesPerFrequency: { type: Number },
  occurrencesPerDay: { type: Number },
  habitdates: Date,
  duration: Number,
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
