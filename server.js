const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = 3000;

require("dotenv").config();

app.use("/users", authRoutes);

const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
  res.send("Home Page1");
});

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
