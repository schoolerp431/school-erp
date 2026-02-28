require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =============================
   DATABASE CONNECTION
============================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* =============================
   ROUTES
============================= */

app.get("/", (req, res) => {
  res.json({ message: "School ERP Backend Running 🚀" });
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Temporary test user (REMOVE later)
    if (email === "admin@gmail.com" && password === "1234") {
      return res.json({ message: "Login successful", role: "admin" });
    }

    return res.status(401).json({ message: "Invalid credentials" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =============================
   404 HANDLER
============================= */

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

/* =============================
   SERVER
============================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
