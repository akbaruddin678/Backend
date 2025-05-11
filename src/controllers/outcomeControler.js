const { OutcomeIndicator } = require("../models/OutcomeIndicator");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

// POST - Create a new outcome
const createOutcome = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.name || !data.value || !data.title) {
      throw new ApiError(400, "Missing required fields: name, value, or title");
    }

    const outcome = new OutcomeIndicator({
      title: data.title,
      name: data.name,
      value: data.value,
      baselineJune2024: data.baseLineJune2024,
      targetJune2025: data.targetJune2025,
      targetJune2026: data.targetJune2026,
      targetJune2027: data.targetJune2027,
      performance: data.performance,
      status: data.status,
    });

    const saved = await outcome.save();

    return res
      .status(201)
      .json(new ApiResponse(201, saved, "Outcome created successfully"));
  } catch (err) {
    next(err);
  }
};

const getOutcomes = async (req, res, next) => {
  try {
    const outcomes = await OutcomeIndicator.find();

    const groupedData = outcomes.reduce((acc, curr) => {
      const groupKey = `${curr.title.replace(/\s+/g, "")}Data`; // e.g., 'Workforce Readiness' → 'WorkforceReadinessData'

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }

      acc[groupKey].push({
        title: curr.title,
        name: curr.name,
        value: curr.value,
        baseLineJune2024: curr.baselineJune2024,
        targetJune2025: curr.targetJune2025,
        targetJune2026: curr.targetJune2026,
        targetJune2027: curr.targetJune2027,
        performance: curr.performance,
        status: curr.status,
        id: curr._id,
      });

      return acc;
    }, {});

    return res
      .status(200)
      .json(
        new ApiResponse(200, groupedData, "Outcomes retrieved successfully")
      );
  } catch (err) {
    console.error("Error retrieving outcomes:", err);
    next(err);
  }
};
const updateOutcomeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new ApiError(400, "Missing required field: status");
    }

    const updatedOutcome = await OutcomeIndicator.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOutcome) {
      throw new ApiError(404, "Outcome not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedOutcome, "Status updated successfully")
      );
  } catch (err) {
    next(err);
  }
};

const updateOutcomePerformance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { performance } = req.body;
    console.log(id, performance);

    if (!performance) {
      throw new ApiError(400, "Missing required field: status");
    }
    const updatedOutcome = await OutcomeIndicator.findByIdAndUpdate(
      id,
      { performance },
      { new: true }
    );

    if (!updatedOutcome) {
      throw new ApiError(404, "Outcome not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedOutcome, "Performance updated successfully")
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOutcome,
  getOutcomes,
  updateOutcomeStatus,
  updateOutcomePerformance,
};
