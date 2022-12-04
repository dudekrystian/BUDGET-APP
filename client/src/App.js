import "./scss/style.css";

//components
import Header from "./components/Header";
import Panel from "./components/Panel-Expense";
import BudgetCard from "./components/BudgetCard";
import useBudgets from "./contexts/budgetsContext";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();

  return (
    <>
      <div className="app">
        <Header />
        <Panel />

        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget._id).reduce(
            (total, expense) => total + expense.amount,
            0
          );

          return (
            <BudgetCard
              key={budget._id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              id={budget._id}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
