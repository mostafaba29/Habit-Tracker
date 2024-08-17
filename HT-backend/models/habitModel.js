const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
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
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    occurrencesPerDay: Number,
    habitDates: {
      type: [Date],
      days: [String]
    },
    duration: Number,
    completedDates: [
      {
        date: {
          type: Date,
          required: true
        },
        isCompleted: {
          type: Boolean,
          default: false
        }
      }
    ],
    streak: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
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

habitSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name"
  });
  next();
});

habitSchema.methods.markAsCompleted = function(date) {
  const completion = this.completedDates.find(
    cd => cd.date.toISOString() === date.toISOString()
  );
  if (completion) {
    completion.isCompleted = true;
    this.streak += 1;
  }
  return this.save();
};

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
