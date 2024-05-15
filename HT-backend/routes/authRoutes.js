const express = require('express');

const authController = require("./../Controllers/authControllers");
const router = express.Router();

router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleAuthCallback,authController.authRedirect);

module.exports = router;