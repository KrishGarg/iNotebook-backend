const express = require("express");
const fs = require("fs");
const { connectToMongo } = require("./db");
const { port } = require("./config.json");

connectToMongo();

const app = express();

app.use(express.json());

// Registering all the routes
const routes = fs.readdirSync("./routes");
for (const route of routes) {
  app.use(`/api/${route}`, require("./routes/" + route));
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
