const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true["a user must have a googleId"],
    unique: true
  },
  username: {
    type: String,
    required: true["A user must have a name"]
  },
  email: {
    type: String,
    required: true["A user must have an email"],
    unique: true
  },
  image: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

UserSchema.methods.generateJWT = function() {
  const payload = {
    id: this._id,
    googleId: this.googleId,
    username: this.username,
    email: this.email
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
