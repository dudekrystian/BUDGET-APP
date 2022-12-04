import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import useBudgets from "../contexts/budgetsContext";

export default function AddExpenseModal({ show, handleClose, budgetId, name }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const { addExpense, budgets } = useBudgets();

  console.log(budgetId);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(budgetId);
  //   console.log(name);

  //   addExpense({
  //     description: descriptionRef.current.value,
  //     amount: parseFloat(amountRef.current.value),
  //     budgetId: budgetIdRef.current.value,
  //   });

  //   handleClose();
  //   console.log(budgetId);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budget_id: budgetId,
    };

    console.log(expense);

    const response = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      console.log("dodano");
    }

    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetId,
    });

    handleClose();
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label> Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label> Category </Form.Label>
            <Form.Select defaultValue={budgetId} ref={budgetIdRef}>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
