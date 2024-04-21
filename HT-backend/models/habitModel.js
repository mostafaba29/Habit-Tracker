const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true["a habit must have a name"],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  Done: Boolean,
  duration: Number,
  startTime: Date,
  repetitionPerMonth: Number,
  repetitionPerWeek: Number,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
