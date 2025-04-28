const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

require("dotenv").config();

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Home Page1");
});

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
