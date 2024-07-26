const express = require("express");
const taskController = require("./../Controllers/taskControllers");
const authController = require("../Controllers/authControllers");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(taskController.getAllUserTasks)
  .post(taskController.createTask);

router
  .route("/:id")
  .get(taskController.getOneTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

router.post("complete-task", taskController.completeTask);

module.exports = router;
