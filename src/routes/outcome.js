const express = require("express");
const {
  createOutcome,
  getOutcomes,
} = require("../controllers/outcomeControler");
const { verifyJWT } = require("../middlewares/auth");

const router = express.Router();

// router.use(verifyJWT);

// POST - Create a new outcome
router.post("/", createOutcome);

// GET - Get all outcomes grouped by category
router.get("/", getOutcomes);

module.exports = router;
