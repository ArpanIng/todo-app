import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function AddTodo({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="hstack my-4 gap-0">
        <input
          className="form-control"
          type="text"
          placeholder="enter your todo here..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="success" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}

export default AddTodo;
