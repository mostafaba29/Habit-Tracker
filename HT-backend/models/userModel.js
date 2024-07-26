const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  habits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit"
    }
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievement"
    }
  ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
