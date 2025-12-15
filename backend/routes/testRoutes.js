const express = require("express");
const router = express.Router();
const Test = require("../models/Test");
const Result = require("../models/Result");

// 1️⃣ TEST YARATISH (ADMIN)
router.post("/create", async (req, res) => {
  try {
    const { testId, createdBy, questions } = req.body;

    if (!testId || !createdBy || !questions || questions.length !== 50) {
      return res.status(400).json({ message: "Test ma'lumotlari noto‘g‘ri" });
    }

    const test = new Test({ testId, createdBy, questions });
    await test.save();

    res.json({ message: "Test yaratildi", testId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2️⃣ TESTNI OLISH (USER)
router.get("/:testId", async (req, res) => {
  const test = await Test.findOne({ testId: req.params.testId });
  if (!test) return res.status(404).json({ message: "Test topilmadi" });

  const questions = test.questions.map(q => ({
    text: q.text,
    options: q.options
  }));

  res.json({
    testId: test.testId,
    title: test.title,
    questions
  });
});

// 3️⃣ TEST TOPSHIRISH (BALL + SAQLASH)
router.post("/submit", async (req, res) => {
  const { testId, answers, name, surname } = req.body;

  const test = await Test.findOne({ testId });
  if (!test) return res.status(404).json({ message: "Test topilmadi" });

  let correct = 0;

  test.questions.forEach((q, i) => {
    if (answers[i] === q.correct) correct++;
  });

  const score = correct * 2;
  let message = "";
  let color = "";

  if (score < 60) {
    message = "Attestatsiya Mock testdan o‘tilmadi";
    color = "red";
  } else if (score < 70) {
    message = "Ikkinchi toifa balini to‘pladingiz";
    color = "orange";
  } else if (score < 80) {
    message = "Birinchi toifa balini to‘pladingiz";
    color = "blue";
  } else {
    message = "Oliy toifa balini to‘pladingiz";
    color = "green";
  }

  await Result.create({
    name,
    surname,
    testId,
    score,
    message,
    color
  });

  res.json({ score, message, color });
});

module.exports = router;
