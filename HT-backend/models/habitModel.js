const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a habit must have a name"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    slug: String,
    done: {
      type: Boolean,
      default: false
    },
    duration: Number,
    startTime: Date,
    frequency: {
      daily: {
        type: Number,
        default: 0
      },
      weekly: {
        type: Number,
        default: 0
      },
      monthly: {
        type: Number,
        default: 0
      }
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

habitSchema.index({ user: 1, habit: 1 }, { unique: true });
const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
