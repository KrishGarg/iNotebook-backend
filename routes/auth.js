const express = require("express");
const router = express.Router();
const User = require("../db/models/User");

// Create a user using: POST "/api/auth". Doesn't require any authentication.
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(req.body);
});

module.exports = router;
