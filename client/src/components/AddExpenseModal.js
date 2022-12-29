import { Form, Modal, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import useBudgets from "../context/budgetsContext";

export default function AddExpenseModal({ show, handleClose, budgetId, name }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const [disabled, setDisabled] = useState(false);

  const { addExpense } = useBudgets();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const expense = {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budget_id: budgetId,
    };

    const response = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      handleClose();
      setDisabled(false);
      addExpense({ json });
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
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
            <Form.Control
              key={budgetId}
              ref={budgetIdRef}
              type="text"
              required
              value={name}
              disabled="disabled"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button disabled={disabled} variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
