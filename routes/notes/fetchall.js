const express = require("express");
const fetchUser = require("../../middlewares/fetchUser");
const Notes = require("../../db/models/Notes");

const router = express.Router();

router.get("/", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({
      user: req.user,
    });
    res.json({ notes });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Internal Server Error",
      rawErrorMessage: err.message,
    });
  }
});

module.exports = {
  route: "/fetchall",
  router,
};
