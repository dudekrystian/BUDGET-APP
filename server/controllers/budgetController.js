const Budget = require("../models/budgetModel.js");
const mongoose = require("mongoose");

// get all
const getBudgets = async (req, res) => {
  const user_id = req.user._id;

  const budgets = await Budget.find({ user_id }).sort({ createdAt: -1 });

  return res.status(200).json(budgets);
};

// get a single

const getBudget = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such budget" });
  }

  const budget = await Budget.findById(id);

  if (!budget) {
    return res.status(404).json(error("no such "));
  }

  res.status(200).json(budget);
};

// create

const createBudget = async (req, res) => {
  const { name, max } = req.body;

  let emptyField = [];
  if (!name) {
    emptyField.push("title");
  }
  if (!max) {
    emptyField.push("max");
  }

  if (emptyField.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyField });
  }

  // add doc to db
  try {
    const user_id = req.user._id;

    const budget = await Budget.create({ name, max, user_id });
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete

const deleteBudget = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such budget" });
  }
  const budget = await Budget.findOneAndDelete({ _id: id });
  if (!budget) {
    return res.status(400).json(error("no such "));
  }
  res.status(200).json(budget);
};

module.exports = {
  getBudgets,
  getBudget,
  deleteBudget,
  createBudget,
};
