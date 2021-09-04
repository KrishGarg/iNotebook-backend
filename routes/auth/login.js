const express = require("express");
const User = require("../../db/models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { jwt_secret: JWTSecret } = require("../../config.json");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
  "/",
  [
    body("email", "Send a valid email").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    // If there are validator errors, returns bad request (400) with an array of errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "Please try to login with correct credentials.",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          error: "Please try to login with correct credentials.",
        });
      }

      const payload = {
        user: user.id,
      };

      const authToken = jwt.sign(payload, JWTSecret);
      res.json({ authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: "Internal Server Error",
        rawErrorMessage: err.message,
      });
    }
  }
);

module.exports = {
  route: "/login", // Equal to /api/auth/createuser
  router,
};
