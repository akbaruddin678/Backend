const mongoose = require("mongoose");
const { Schema } = mongoose;

const outcomeSchema = new Schema({
  title: String,
  name: String,
  value: String,
  baselineJune2024: String,
  targetJune2025: String,
  targetJune2026: String,
  targetJune2027: String,
  performance: String,
  status: {
    type: String,
    enum: ["On-track", "High-risk", "Minor-delay", "Off-track"],
  },
});

const OutcomeIndicator = mongoose.model("OutcomeIndicator", outcomeSchema);

module.exports = { OutcomeIndicator };
