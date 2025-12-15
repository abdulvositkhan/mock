const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  name: String,
  surname: String,
  testId: String,
  correctCount: Number,
  score: Number,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", ResultSchema);
