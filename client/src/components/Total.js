import React from "react";
import useBudgets from "../contexts/budgetsContext";

export default function Total() {
  const { expenses, budgets } = useBudgets();

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const totalBudgetsAmount = budgets.reduce(
    (total, bugdet) => total + bugdet.max,
    0
  );

  return (
    <>
      <label>
        Total: {totalAmount}/{totalBudgetsAmount} PLN
      </label>
    </>
  );
}
