const mongoose = require("mongoose");
const { Schema } = mongoose;

const outcomeSchema = new Schema({
  indicator: String,
  category: String,
  performance: String,
  status: {
    type: String,
    enum: ["on-track", "high-risk", "minor-delay", "off-track"],
  },
});

const OutcomeIndicator = mongoose.model("OutcomeIndicator", outcomeSchema);

module.exports = { OutcomeIndicator };
