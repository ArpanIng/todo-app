import React from "react";
import Button from "react-bootstrap/Button";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

function Task({ task, onToggleComplete, openEditModal, openDeleteModal }) {
  return (
    <div className="hstack gap-3 border border-2 rounded p-2">
      <div className="p-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.is_completed}
            onChange={() => onToggleComplete(task.id, task.is_completed)}
          />
          <label
            className={`form-check-label ms-2 fw-semibold ${
              task.is_completed ? "text-decoration-line-through" : ""
            }`}
          >
            {task.name}
          </label>
        </div>
      </div>
      <div className="p-2 ms-auto">
        <div className="hstack gap-2">
          <Button variant="light" onClick={() => openEditModal(task.id)}>
            <BsPencilSquare color="blue" />
          </Button>
          <Button variant="light" onClick={() => openDeleteModal(task.id)}>
            <BsFillTrashFill color="red" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Task;
