const express = require("express");
const User = require("../../db/models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { jwt_secret: JWTSecret } = require("../../config.json");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Create a user using: POST "/api/auth/createuser". Doesn't require any authentication.
router.post(
  "/",
  [
    body("email", "Send a valid email").isEmail(),
    body("name", "Name must be atleast 3 characters long.").isLength({
      min: 3,
    }),
    body("password", "Password must be atleast 5 characters long.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are validator errors, returns bad request (400) with an array of errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with the same email exists already.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "A user with this email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // If it doesn't exist, we are adding it to the database.
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: user.id,
      };
      const authToken = jwt.sign(data, JWTSecret);
      res.json({ authToken });
    } catch (err) {
      // If any unexpected error occurs, it logs the error and sends a 500 response.
      console.error(err.message);
      res.status(500).json({
        error: "Internal Server Error",
        rawErrorMessage: err.message,
      });
    }
  }
);

module.exports = {
  route: "/createuser", // Equal to /api/auth/createuser
  router,
};
