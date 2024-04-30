const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a name"]
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true
  },
  habits: {
    type: mongoose.Schema.ObjectId,
    ref: "Habit"
  },
  image: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
