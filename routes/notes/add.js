const express = require("express");
const fetchUser = require("../../middlewares/fetchUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../../db/models/Notes");

router.post(
  "/",
  fetchUser,
  [
    body("title", "Title should be atleast 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description should be atleast 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user,
      });

      const savedNote = await note.save();

      res.json(savedNote);
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
  route: "/add",
  router,
};
