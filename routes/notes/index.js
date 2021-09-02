const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const routes = fs.readdirSync(path.join(__dirname, "subroutes"));
for (const route of routes) {
  router.use(`/${route}`, require("./subroutes/" + route));
}

module.exports = router;
