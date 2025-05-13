const { TrainingStatus } = require("../models/skilledWorker");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

// POST - Create training status entry
const createTrainingStatus = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.area || data.target_june_2025 === undefined) {
      throw new ApiError(400, "Missing required fields");
    }

    const entry = new TrainingStatus({
      area: data.area,
      baseline_2024: data.baseline_2024,
      target_june_2025: data.target_june_2025,
      target_june_2026: data.target_june_2026,
      target_june_2027: data.target_june_2027,
      current_status: data.current_status,
    });

    const saved = await entry.save();
    return res
      .status(201)
      .json(
        new ApiResponse(201, saved, "Training status created successfully")
      );
  } catch (err) {
    next(err);
  }
};

// GET - Fetch all training status entries
const getTrainingStatuses = async (req, res, next) => {
  try {
    const data = await TrainingStatus.find();
    return res
      .status(200)
      .json(
        new ApiResponse(200, data, "Training statuses retrieved successfully")
      );
  } catch (err) {
    next(err);
  }
};

// PATCH - Update current status by ID
const updateTrainingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { current_status } = req.body;

    if (current_status === undefined) {
      throw new ApiError(400, "Missing required field: current_status");
    }

    const updated = await TrainingStatus.findByIdAndUpdate(
      id,
      { current_status },
      { new: true }
    );

    if (!updated) {
      throw new ApiError(404, "Training status not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updated, "Current status updated successfully")
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTrainingStatus,
  getTrainingStatuses,
  updateTrainingStatus,
};
