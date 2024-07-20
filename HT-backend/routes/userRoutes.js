const express = require("express");
const authController = require("./../Controllers/authControllers");
const userController = require("./../Controllers/userControllers");

const router = express.Router();

router.get("/", authController.protect, userController.getUserInfo);
module.exports = router;
