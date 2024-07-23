const express = require("express");
const achievementController = require("./../Controllers/achievementControllers");
const authController = require("../Controllers/authControllers");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(achievementController.getAllAchievements);

module.exports = router;
