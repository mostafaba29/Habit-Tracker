const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    password: {
      type: String,
      required: true
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

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

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
