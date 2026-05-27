// Main server file for IssueVault backend
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const complaintRoutes = require("./routes/complaintroute");
app.use("/api", complaintRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("IssueVault Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});