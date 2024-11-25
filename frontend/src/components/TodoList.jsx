import React from "react";
import Todo from "./Todo";

function TodoList({ todos, toggleComplete, updateTodo, deleteTodo }) {
  return (
    <div className="vstack gap-2">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
