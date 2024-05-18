const express = require("express");
const habitController = require("./../Controllers/habitControllers");
const authController = require("../Controllers/authControllers");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, habitController.getAllUserHabits)
  .post(authController.protect, habitController.createHabit);

router
  .route("/:id")
  .get(habitController.getOneHabit)
  .patch(habitController.updateHabit)
  .delete(habitController.deleteHabit);

module.exports = router;
