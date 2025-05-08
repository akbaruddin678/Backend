import express from "express";
import { createOutcome, getOutcomes } from "../controllers/outcomeControler.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

router.use(verifyJWT);

// POST - Create a new outcome
router.post("/", createOutcome);

// GET - Get all outcomes grouped by category
router.get("/", getOutcomes);

export default router;
