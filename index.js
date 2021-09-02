const express = require("express");
const { connectToMongo } = require("./db");
const { port } = require("./config.json");

connectToMongo();

const app = express();

app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
