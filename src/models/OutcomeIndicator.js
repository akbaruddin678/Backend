import mongoose, { Schema } from "mongoose";

const outcomeSchema = new Schema({
  indicator: String,
  baseline2024: String,
  target2025: String,
  target2026: String,
  target2027: String,
  performanceTillApril2025: String,
  category: String,
});

export const OutcomeIndicator = mongoose.model(
  "OutcomeIndicator",
  outcomeSchema
);
