const express = require("express");
const {
  createOutcome,
  getOutcomes,
  updateOutcomeStatus,
  updateOutcomePerformance,
} = require("../controllers/outcomeControler");
const { verifyJWT } = require("../middlewares/auth");

const router = express.Router();

// router.use(verifyJWT);

// POST - Create a new outcome
router.post("/", createOutcome);

// GET - Get all outcomes grouped by category
router.get("/", getOutcomes);
router.patch("/status/:id", updateOutcomeStatus);
router.patch("/performance/:id", updateOutcomePerformance);

module.exports = router;
