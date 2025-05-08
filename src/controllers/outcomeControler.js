import { OutcomeIndicator } from "../models/OutcomeIndicator.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// POST - Create a new outcome
export const createOutcome = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.indicator) {
      throw new ApiError(400, "Indicator is required");
    }
    const outcome = new OutcomeIndicator({
      ...data,
    });
    const saved = await outcome.save();
    return res
      .status(201)
      .json(new ApiResponse(201, saved, "Outcome created successfully"));
  } catch (err) {
    next(err);
  }
};

// GET all outcomes grouped by category
export const getOutcomes = async (req, res, next) => {
  try {
    const outcomes = await OutcomeIndicator.find();

    const grouped = outcomes.reduce((acc, curr) => {
      acc.push({
        _id: curr._id,
        category: curr.category,
        indicator: curr.indicator,
        performance: curr.performance,
        status: curr.status,
      });
      return acc;
    }, []);

    const response = grouped.map((data) => ({
      data,
    }));

    return res.json(
      new ApiResponse(200, response, "Outcomes retrieved successfully")
    );
  } catch (err) {
    next(err);
  }
};
