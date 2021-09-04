const express = require("express");
const router = express.Router();
const fetchUser = require("../../middlewares/fetchUser");
const Notes = require("../../db/models/Notes");

router.put("/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  let note = await Notes.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      error: "Not Found",
    });
  }

  if (note.user.toString() !== req.user) {
    return res.status(401).json({
      error: "Not Authorized",
    });
  }

  if (title) {
    note.title = title;
  }
  if (description) {
    note.description = description;
  }
  if (tag) {
    note.tag = tag;
  }

  await note.save();

  res.json(note);
});

module.exports = {
  route: "/update",
  router,
};
