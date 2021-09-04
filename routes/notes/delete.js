const express = require("express");
const router = express.Router();
const fetchUser = require("../../middlewares/fetchUser");
const Notes = require("../../db/models/Notes");

router.delete("/:id", fetchUser, async (req, res) => {
  try {
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

    await note.delete();
    res.json({ message: "Note has been deleted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Internal Server Error",
      rawErrorMessage: err.message,
    });
  }
});

module.exports = {
  route: "/delete",
  router,
};
