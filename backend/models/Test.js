const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: {
    A: String,
    B: String,
    C: String,
    D: String
  },
  correct: {
    type: String, // "A" | "B" | "C" | "D"
    required: true
  }
});

const TestSchema = new mongoose.Schema(
  {
    testId: {
      type: String,
      required: true,
      unique: true
    },

    title: {
      type: String,
      default: "Attestatsiya Mock Test"
    },

    questions: {
      type: [QuestionSchema],
      validate: [arr => arr.length === 50, "Testda 50 ta savol bo‘lishi kerak"]
    },

    createdBy: {
      type: String, // admin ID
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", TestSchema);
