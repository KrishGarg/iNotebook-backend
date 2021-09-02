const express = require("express");
const { connectToMongo } = require("./db");
const { port } = require("./config.json");

connectToMongo();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
