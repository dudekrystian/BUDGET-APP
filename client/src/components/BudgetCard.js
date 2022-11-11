import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { currencyFormatter } from "../utils/utils";
import AddExpenseModal from "./AddExpenseModal";

export default function BudgetCard({ name, amount, max }) {
  const [showAddBudgetsModal, setShowAddBudgetsModal] = useState(false);
  function handleExpense(e) {
    e.preventDefault();
    setShowAddBudgetsModal(true);
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
          handleClose={() => setShowAddBudgetsModal(false)}
        />
        <button className="list">List Expense</button>
        <button className="remove-card">Remove All</button>
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
