import "./scss/style.css";

//components
import Header from "./components/Header";
import Panel from "./components/Panel-Expense";
import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <div className="app">
      <Header />
      <Panel total={11000} />
      <BudgetCard name="Food" amount={150} max={1000} />
      <BudgetCard name="Entertaiment" amount={51} max={100} />
      <BudgetCard name="Sport" amount={79} max={100} />
      <BudgetCard name="Travel" amount={99} max={100} />
    </div>
  );
}

export default App;
