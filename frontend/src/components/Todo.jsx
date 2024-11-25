import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

function Todo({ todo, toggleComplete, updateTodo, deleteTodo }) {
  const [updatedName, setUpdatedName] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = (todo) => {
    setSelectedTodo(todo);
    setUpdatedName(todo.name);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedTodo(null);
    setUpdatedName("");
    setShow(false);
  };

  const handleUpdate = async () => {
    await updateTodo(selectedTodo.id, { name: updatedName });
    handleClose();
  };

  const handleToggleCompleted = async (id) => {
    await toggleComplete(id);
  };

  return (
    <div className="hstack gap-3 border border-2 rounded p-2">
      <div className="p-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={todo.is_completed}
            onChange={() => handleToggleCompleted(todo.id)}
          />
          <label
            className={`form-check-label ms-2 fw-semibold ${
              todo.is_completed ? "text-decoration-line-through" : ""
            }`}
          >
            {todo.name}
          </label>
        </div>
      </div>
      <div className="p-2 ms-auto">
        <div className="hstack gap-2">
          <Button variant="light" onClick={() => handleShow(todo)}>
            <BsPencilSquare color="blue" />
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          <Button variant="light" onClick={() => deleteTodo(todo.id)}>
            <BsFillTrashFill color="red" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
