const express = require("express");
const achievementController = require("./../Controllers/achievementControllers");
const IsLoggedIn = require("../Controllers/authControllers");

const router = express.Router();

router.use(IsLoggedIn);

router.route("/").get(achievementController.getAllAchievements);

module.exports = router;
