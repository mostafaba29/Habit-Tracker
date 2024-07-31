const User = require("../models/userModel");

const IsLoggedIn = async (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const user = await User.findById(userId);
    if (!user || !user.active) {
      return res.status(401).json({ message: "User not found or not active" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = IsLoggedIn;
