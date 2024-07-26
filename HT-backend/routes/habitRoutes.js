const express = require("express");
const habitController = require("./../Controllers/habitControllers");
const authController = require("../Controllers/authControllers");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(habitController.getAllUserHabits)
  .post(habitController.createHabit);

router
  .route("/:id")
  .get(habitController.getOneHabit)
  .patch(habitController.updateHabit)
  .delete(habitController.deleteHabit);

router.post("complete-habit", habitController.completeTask);

module.exports = router;
