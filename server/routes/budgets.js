const express = require("express");
const {
  getBudget,
  getBudgets,
  deleteBudget,
  createBudget,
} = require("../controllers/budgetController.js");

// create router
const router = express.Router();

// GET all budgets category
router.get("/", getBudgets);

// GET a single budget category
router.get("/:id", getBudget);

// POST a new budget category
router.post("/", createBudget);

// DELETE a budget category
router.delete("/:id", deleteBudget);

module.exports = router;
