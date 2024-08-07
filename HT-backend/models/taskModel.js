const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    description: {
      type: String
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    time: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    completedDates: [
      {
        date: {
          type: Date,
          default: Date.now
        },
        isCompleted: {
          type: Boolean,
          default: false
        }
      }
    ],
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

taskSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name"
  });
  next();
});

taskSchema.methods.markAsCompleted = function(date) {
  const completion = this.completedDates.find(
    cd => cd.date.toISOString() === date.toISOString()
  );
  if (completion) {
    completion.isCompleted = true;
    this.streak += 1;
  }
  return this.save();
};

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
