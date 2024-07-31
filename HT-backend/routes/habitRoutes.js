const express = require("express");
const habitController = require("./../Controllers/habitControllers");
const IsLoggedIn = require("../Controllers/authControllers");

const router = express.Router();

router.use(IsLoggedIn);

router
  .route("/")
  .get(habitController.getAllUserHabits)
  .post(habitController.createHabit);

router
  .route("/:id")
  .patch(habitController.updateHabit)
  .delete(habitController.deleteHabit);

router.post("complete-habit", habitController.completeHabit);

module.exports = router;
