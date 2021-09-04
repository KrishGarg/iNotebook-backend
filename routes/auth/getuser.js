const express = require("express");
const User = require("../../db/models/User");
const fetchUser = require("../../middlewares/fetchUser");

router = express.Router();

// Get logged in user's details.
router.post("/", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      user,
    });
  } catch (err) {
    // If any unexpected error occurs, it logs the error and sends a 500 response.
    console.error(err.message);
    res.status(500).json({
      error: "Internal Server Error",
      rawErrorMessage: err.message,
    });
  }
});

module.exports = {
  route: "/getuser",
  router,
};
