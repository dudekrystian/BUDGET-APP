import AddBudgetModal from "./AddBudgetModal";
import { useState } from "react";
import Total from "./Total";

export default function Panel({ total }) {
  const [showAddBudgetsModal, setShowAddBudgetsModal] = useState(false);
  function handleAddBudget(e) {
    e.preventDefault();
    setShowAddBudgetsModal(true);
  }

  return (
    <>
      <div className="panel-expense">
        <button onClick={handleAddBudget}>Add Budget</button>
        <Total />
      </div>
      <AddBudgetModal
        show={showAddBudgetsModal}
        handleClose={() => setShowAddBudgetsModal(false)}
      />
    </>
  );
}
