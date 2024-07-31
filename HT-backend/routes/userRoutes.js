const express = require("express");
const userController = require("./../Controllers/userControllers");
const IsLoggedIn = require("../Controllers/authControllers");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.use(IsLoggedIn);

router
  .route("/")
  .get(userController.getUserPage)
  .delete(userController.deleteUser);

module.exports = router;
