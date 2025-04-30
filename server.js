const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = 3000;
const cors = require("cors");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/users", authRoutes);

const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
  res.send("Home Page1");
});

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
