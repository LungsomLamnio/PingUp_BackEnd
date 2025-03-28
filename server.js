const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, (req, res) => {
  console.log(`server running on http://localhost:${PORT}`);
});
