import React, { useContext, useState, useEffect } from "react";

const BudgetsContext = React.createContext();

export default function useBudgets() {
  return useContext(BudgetsContext);
}

//  fetch api

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchBudget = async () => {
    const response = await fetch("/api/budgets", {
      method: "GET",
    });
    const json = await response.json();

    if (response.ok) {
      setBudgets(json);
    }
  };

  const fetchExpense = async () => {
    const response = await fetch("/api/expenses", {
      method: "GET",
    });
    const json = await response.json();

    if (response.ok) {
      setExpenses(json);
    }
  };

  useEffect(() => {
    fetchExpense();
    fetchBudget();
  }, []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budget_id === budgetId);
  }

  function addExpense({ description, amount, budgetId, id }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id, description, amount, budgetId }];
    });
  }

  function addBudget({ name, max, id }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id, name, max }];
    });
  }

  function deleteBudget({ id }) {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
