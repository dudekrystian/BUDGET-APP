import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { currencyFormatter } from "../utils/utils";
import AddExpenseModal from "./AddExpenseModal";
import useBudgets from "../contexts/budgetsContext";
import ViewExpensesModal from "./ViewExpensesModal";

export default function BudgetCard({ name, amount, max, id }) {
  const [showAddBudgetsModal, setShowAddBudgetsModal] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);
  const { deleteBudget } = useBudgets();

  function handleExpense(e) {
    e.preventDefault();
    setShowAddBudgetsModal(true);
    console.log(id);
  }

  function handleRemoveAll(e) {
    e.preventDefault();
    deleteBudget({ id });
  }

  function handleListExpenses(e) {
    e.preventDefault();
    setShowViewExpensesModal(true);
  }

  return (
    <div className="budget-card">
      <div className="budget-card-amount">
        <h2>{name}</h2>
        <span>
          {currencyFormatter.format(amount)} / {currencyFormatter.format(max)}
        </span>
      </div>
      <ProgressBar
        bgcolor={getProgressBarColor(amount, max)}
        completed={getProgressBarColorBarValue(amount, max)}
      />

      <div className="budget-card-button">
        <button className="add" onClick={handleExpense}>
          Add Expense
        </button>
        <AddExpenseModal
          show={showAddBudgetsModal}
          budgetId={id}
          name={name}
          handleClose={() => setShowAddBudgetsModal(false)}
        />
        <button className="list" onClick={handleListExpenses}>
          List Expenses
        </button>
        <ViewExpensesModal
          show={showViewExpensesModal}
          budgetId={id}
          handleClose={() => setShowViewExpensesModal(false)}
        />
        <button onClick={handleRemoveAll} className="remove-card">
          Remove All
        </button>
      </div>
    </div>
  );
}

function getProgressBarColor(amount, max) {
  const ratio = (amount / max) * 100;

  if (ratio <= 50) {
    return "blue";
  }

  if (ratio <= 65) {
    return "green";
  }

  if (ratio <= 85) {
    return "orange";
  }

  if (ratio <= 100) {
    return "red";
  }
}

function getProgressBarColorBarValue(amount, max) {
  const ratio = (amount / max) * 100;

  return ratio;
}
