const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  time: String,
  completedDates: [
    {
      date: Date,
      isCompleted: Boolean
    }
  ]
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
