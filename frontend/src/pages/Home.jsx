import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { BASE_URL } from "../api/endpoint";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos/`);
      const data = response.data;
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (newTodo) => {
    try {
      const response = await axios.post(`${BASE_URL}/todos/`, {
        name: newTodo,
      });
      const data = response.data;
      setTodos([data, ...todos]);
    } catch (error) {
      console.error("Error adding new todo:", error);
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/todos/${id}/`, updatedData);
      const data = response.data;
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, name: data.name } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      // toggle the completion status
      const updatedTodo = {
        ...todoToUpdate,
        is_completed: !todoToUpdate.is_completed,
      };
      const response = await axios.put(`${BASE_URL}/todos/${id}/`, updatedTodo);

      // Update the local state after the update
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, is_completed: response.data.is_completed }
            : todo
        )
      );
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${id}/`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container text-center my-4">
      <Title />
      <AddTodo addTodo={createTodo} />
      <TodoList
        todos={todos}
        updateTodo={updateTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default Home;
