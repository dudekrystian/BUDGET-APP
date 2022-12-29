import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { currencyFormatter } from "../utils/utils";
import AddExpenseModal from "./AddExpenseModal";
import useBudgets from "../context/budgetsContext";
import ViewExpensesModal from "./ViewExpensesModal";
import { useAuthContext } from "../hooks/useAuthContext";

export default function BudgetCard({ name, amount, max, id }) {
  const [showAddBudgetsModal, setShowAddBudgetsModal] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

  const { deleteBudget, expenses, deleteExpense } = useBudgets();
  const { user } = useAuthContext();

  function handleExpense(e) {
    e.preventDefault();
    setShowAddBudgetsModal(true);
  }

  // function handleRemoveAll(e) {
  //   e.preventDefault();

  //   const deleteAllEppense = async () => {
  //     const dele = expenses.filter((ex) => ex.budget_id === id);
  //     const arrayExpenseToRemove = dele.map((del) => del._id);

  //     for (let i = 0; i < arrayExpenseToRemove.length; i++) {
  //       const response = await fetch(
  //         "/api/expenses/" + arrayExpenseToRemove[i],
  //         {
  //           method: "DELETE",
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //           },
  //         }
  //       );
  //       const json = response.json();

  //       if (response.ok) {
  //         console.log(`delete ex ${json}`);

  //         deleteExpense({ json });
  //       }
  //     }
  //   };

  //   const handleClick = async () => {
  //     e.preventDefault();
  //     deleteAllEppense();

  //     if (!user) {
  //       return;
  //     }
  //     const response = await fetch("/api/budgets/" + id, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();

  //     if (response.ok) {
  //       console.log(`delete ${json}`);
  //       deleteBudget({ json });
  //     }
  //   };

  //   handleClick();
  // }

  const deleteAllEppense = async () => {
    const dele = expenses.filter((ex) => ex.budget_id === id);
    const arrayExpenseToRemove = dele.map((del) => del._id);

    for (let i = 0; i < arrayExpenseToRemove.length; i++) {
      const response = await fetch("/api/expenses/" + arrayExpenseToRemove[i], {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = response.json();

      if (response.ok) {
        console.log(`delete ex ${json}`);
        deleteExpense({ json });
      }
    }
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/budgets/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(`delete ${json}`);
      deleteBudget({ json });
    }
  };

  function handleRemoveAll(e) {
    handleClick();

    e.preventDefault();
    deleteAllEppense();
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
          key={id}
          name={name}
          handleClose={() => setShowAddBudgetsModal(false)}
        />
        <button className="list" onClick={handleListExpenses}>
          List Expenses
        </button>
        <ViewExpensesModal
          show={showViewExpensesModal}
          budgetId={id}
          name={name}
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

  if (ratio > 100) {
    return "darkgrey";
  }
}

function getProgressBarColorBarValue(amount, max) {
  const ratio = (amount / max) * 100;

  if (ratio > 100) {
    return 100;
  }

  return ratio;
}
