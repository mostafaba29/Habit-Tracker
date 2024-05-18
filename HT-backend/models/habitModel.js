const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true["a habit must have a name"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    done: Boolean,
    duration: Number,
    startTime: Date,
    freqency: {
      type: String,
      value: Number,
      trim: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Habit must belong to a user"]
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

habitSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "username"
  });
  next();
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
