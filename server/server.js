const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const receiverRoutes=require("./routes/receiverRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const chatRoutes=require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();

const app = express();

// Middleware FIRST
app.use(cors());
app.use(express.json());
// Import Routes
const authRoutes = require("./routes/authRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/receiver",receiverRoutes);
app.use("/api/requests",requestRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/messages", messageRoutes);

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// Test Route
app.get("/", (req, res) => {
    res.send("Blood Donation Assistance System Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});