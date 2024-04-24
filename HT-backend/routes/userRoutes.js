const express = require("express");
const authController = require("./../Controllers/authControllers");
const userController = require("./../Controllers/userControllers");

const router = express.Router();

//router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.post("/logout", authController.logout);
// //router.get("/me", userConroller.getUser);

module.exports = router;
