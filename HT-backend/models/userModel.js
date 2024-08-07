const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
      unique: true
    },
    active: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  foreignField: "user",
  localField: "_id"
});

userSchema.virtual("habits", {
  ref: "Habit",
  foreignField: "user",
  localField: "_id"
});

userSchema.virtual("achievements", {
  ref: "Achievement",
  foreignField: "user",
  localField: "_id"
});

const User = mongoose.model("User", userSchema);
module.exports = User;
