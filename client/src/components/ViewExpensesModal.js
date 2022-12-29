import { Modal, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils/utils";
import useBudgets from "../context/budgetsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

export default function ViewExpensesModal({
  budgetId,
  handleClose,
  show,
  name,
}) {
  const [disabled, setDisabled] = useState(false);
  const { getBudgetExpenses } = useBudgets();
  const { user } = useAuthContext();

  const expenses = getBudgetExpenses(budgetId);

  const handleClick = async (expense) => {
    setDisabled(true);
    if (!user) {
      return;
    }
    const response = await fetch("/api/expenses/" + expense._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      // deleteExpense({ json });
      setDisabled(false);
    }
  };

  const red = {
    color: "red",
  };

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>
              Expenses: <strong style={red}> {name} </strong>
            </div>
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
                disabled={disabled}
                onClick={() => handleClick(expense)}
                size="xl"
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
