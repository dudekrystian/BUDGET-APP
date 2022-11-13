import { Modal, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils/utils";
import useBudgets from "../contexts/budgetsContext";

export default function ViewExpensesModal({ budgetId, handleClose, show }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  console.log(expenses);

  const budget = budgets.find((budget) => budget.id === budgetId);

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {
              <Button
                onClick={() => {
                  expenses.forEach((expenseId) => deleteExpense(expenseId));
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            }
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
