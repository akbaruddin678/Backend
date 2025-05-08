import { OutcomeIndicator } from "../models/OutcomeIndicator.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { DB_NAME, categoryMap } from "../constants.js";

// POST - Create a new outcome
export const createOutcome = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.indicator) {
      throw new ApiError(400, "Indicator is required");
    }

    const category = categoryMap[data.indicator] || "WorkforceReadiness";

    const outcome = new OutcomeIndicator({
      ...data,
      category,
    });

    const saved = await outcome.save();

    return res
      .status(201)
      .json(new ApiResponse(201, saved, "Outcome created successfully"));
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

// GET all outcomes grouped by category
export const getOutcomes = async (req, res, next) => {
  try {
    const outcomes = await OutcomeIndicator.find();

    const grouped = outcomes.reduce((acc, curr) => {
      const category = curr.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push({
        indicator: curr.indicator,
        baseline2024: curr.baseline2024,
        target2025: curr.target2025,
        target2026: curr.target2026,
        target2027: curr.target2027,
        performanceTillApril2025: curr.performanceTillApril2025,
      });
      return acc;
    }, {});

    const response = Object.entries(grouped).map(([name, data]) => ({
      name,
      data,
    }));

    return res.json(
      new ApiResponse(200, response, "Outcomes retrieved successfully")
    );
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};
