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
        <Panel total={0} />

        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
