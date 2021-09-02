const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Initializing all sub-routes.
let routes = fs.readdirSync(__dirname);
routes.splice(routes.indexOf("index.js"), 1);

for (const route of routes) {
  const d = require(path.join(__dirname, route));
  router.use(d.route, d.router);
}

module.exports = router;
