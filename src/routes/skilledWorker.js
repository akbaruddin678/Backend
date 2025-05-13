const express = require("express");
const {
  createTrainingStatus,
  getTrainingStatuses,
  updateTrainingStatus,
} = require("../controllers/skilledWorker");
const router = express.Router();

router.post("/", createTrainingStatus);
router.get("/", getTrainingStatuses);
router.patch("/:id", updateTrainingStatus);

module.exports = router;
