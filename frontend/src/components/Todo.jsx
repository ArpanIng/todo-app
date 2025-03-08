import React from "react";
import Button from "react-bootstrap/Button";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

function Todo({ todo, onToggleComplete, openEditModal, openDeleteModal }) {
  return (
    <div className="hstack gap-3 border border-2 rounded p-2">
      <div className="p-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={todo.is_completed}
            onChange={() => onToggleComplete(todo.id, todo.is_completed)}
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
          <Button variant="light" onClick={() => openEditModal(todo.id)}>
            <BsPencilSquare color="blue" />
          </Button>
          <Button variant="light" onClick={() => openDeleteModal(todo.id)}>
            <BsFillTrashFill color="red" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
