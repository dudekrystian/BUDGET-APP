import React from "react";

export default function Panel({ total }) {
  return (
    <div className="panel-expense">
      <button>Add Expense</button>
      <label>Total: {total}</label>
    </div>
  );
}
