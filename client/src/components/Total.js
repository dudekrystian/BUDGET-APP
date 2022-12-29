import React from "react";
import useBudgets from "../context/budgetsContext";

export default function Total() {
  const { budgets, getBudgetExpenses } = useBudgets();

  const currentBudgetsId = budgets.map((budget) => budget._id);

  let arrayExpense = [];
  const handleValueExpense = currentBudgetsId.forEach((element) =>
    arrayExpense.push(getBudgetExpenses(element))
  );

  const totalAmount = arrayExpense.map((element) =>
    element.map((el) => el.amount)
  );

  const total = totalAmount.join();

  const totalArrayNumber = total.split(",").map(function (item) {
    return parseFloat(item, 10);
  });

  const totalArrayNumber1 = totalArrayNumber.map((item) => {
    if (isNaN(item)) {
      return 0;
    } else {
      return item;
    }
  });

  const totalExpensesAmount = totalArrayNumber1.reduce(
    (total, expense) => total + expense,
    0
  );

  const totalBudgetsAmount = budgets.reduce(
    (total, bugdet) => total + bugdet.max,
    0
  );

  return (
    <>
      <label>
        Total: {totalExpensesAmount}/{totalBudgetsAmount} PLN
      </label>
    </>
  );
}
