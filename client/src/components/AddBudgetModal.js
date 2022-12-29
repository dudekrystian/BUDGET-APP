import { Form, Modal, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import useBudgets from "../context/budgetsContext";
import { useAuthContext } from "../hooks/useAuthContext.js";

export default function AddBudgetModal({ show, handleClose }) {
  const { user } = useAuthContext();
  const [disabled, setDisabled] = useState(false);

  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const budget = {
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    };

    const response = await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify(budget),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      addBudget({ json });
      setDisabled(false);
      handleClose();
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
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
