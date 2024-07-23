const express = require("express");
const taskController = require("./../Controllers/taskControllers");
const authController = require("../Controllers/authControllers");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router
  .route("/:id")
  .get(taskController.getOneTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
