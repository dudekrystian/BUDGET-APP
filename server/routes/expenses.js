const express = require("express");
const {
  createExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expenseController.js");

// create router
const router = express.Router();

// // GET all expenses
router.get("/", getExpenses);

// // GET a single budget category
// router.get("/:id", getBudget);

// CREATE NEW EXPENSE
router.post("/", createExpense);

// // DELETE a budget category
router.delete("/:id", deleteExpense);

module.exports = router;
