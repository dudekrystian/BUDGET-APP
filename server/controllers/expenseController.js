const Expense = require("../models/expenseModel.js");
const mongoose = require("mongoose");

const getExpenses = async (req, res) => {
  const expenses = await Expense.find();

  return res.status(200).json(expenses);
};
// create simle expense
const createExpense = async (req, res) => {
  const { description, amount, budget_id } = req.body;

  let emptyField = [];
  if (!description) {
    emptyField.push("description");
  }
  if (!amount) {
    emptyField.push("amount");
  }

  if (emptyField.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyField });
  }

  // add doc to db
  try {
    const expense = await Expense.create({ description, amount, budget_id });

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such expense" });
  }
  const expense = await Expense.findOneAndDelete({ _id: id });
  if (!expense) {
    return res.status(400).json(error("no such "));
  }
  res.status(200).json(expense);
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
};
