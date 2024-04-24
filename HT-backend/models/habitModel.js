const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true["a habit must have a name"],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  Done: Boolean,
  duration: Number,
  startTime: Date,
  repetition: {
    daily: Number,
    weekly: Number,
    monthly: Number
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
