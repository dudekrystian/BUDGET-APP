const express = require("express");
const {
  getBudget,
  getBudgets,
  deleteBudget,
  createBudget,
} = require("../controllers/budgetController.js");

const requireAuth = require("../middleware/requireAuth");

// create router
const router = express.Router();

router.use(requireAuth);

// GET all budgets category
router.get("/", getBudgets);

// GET a single budget category
router.get("/:id", getBudget);

// POST a new budget category
router.post("/", createBudget);

// DELETE a budget category
router.delete("/:id", deleteBudget);

module.exports = router;
