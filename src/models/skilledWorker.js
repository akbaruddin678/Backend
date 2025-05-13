const mongoose = require("mongoose");

const TrainingStatusSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  baseline_2024: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  target_june_2025: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  target_june_2026: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  target_june_2027: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  current_status: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const TrainingStatus = mongoose.model("TrainingStatus", TrainingStatusSchema);

module.exports = { TrainingStatus };
