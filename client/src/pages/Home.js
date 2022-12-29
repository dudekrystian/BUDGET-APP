import "../scss/style.css";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import Header from "../components/Header";
import Panel from "../components/Panel-Expense";
import BudgetCard from "../components/BudgetCard";
import useBudgets from "../context/budgetsContext";

function Home() {
  const { budgets, getBudgetExpenses } = useBudgets();

  const { user } = useAuthContext();

  return (
    <>
      <div className="app">
        <Header user={user} />
        <Panel />

        <div className="container-budget-card">
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
      </div>
    </>
  );
}

export default Home;
