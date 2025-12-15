const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Result = require("../models/Result");

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    return res.status(401).json({ message: "Login yoki parol noto‘g‘ri" });
  }

  res.json({ message: "Admin kirdi" });
});

// ADMIN — NATIJALAR
router.get("/results", async (req, res) => {
  const results = await Result.find().sort({ createdAt: -1 });
  res.json(results);
});

module.exports = router;
