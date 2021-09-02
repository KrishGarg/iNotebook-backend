const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    test: "you getted the notes endpoint",
  });
});

module.exports = router;
