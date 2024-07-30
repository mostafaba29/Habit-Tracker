const express = require("express");
const authController = require("./../Controllers/authControllers");
const userController = require("./../Controllers/userControllers");

const router = express.Router();

// router.get("/signup", authController.signup);
// router.get("/login", authController.login);
// router.get("/logout", authController.logout);

router.use(authController.protect);

router
  .route("/")
  .get(userController.getUserPage)
  .delete(userController.deleteUser);

module.exports = router;
