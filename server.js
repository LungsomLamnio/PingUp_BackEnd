// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Initialize app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://pingup-frontend-weld.vercel.app", // Ensure only the frontend is allowed
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("send_message", (data) => {
    // Emit to all *except* the sender
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Port configuration
const PORT = process.env.PORT || 3001;

// Connect to the database
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://pingup-frontend-weld.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// API Routes
app.use("/users", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("PingUp Chat Server is Running 🟢");
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
