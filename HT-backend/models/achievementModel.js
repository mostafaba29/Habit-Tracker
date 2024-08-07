const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
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
    },
    hotStreak: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

achievementSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name"
  });
  next();
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
