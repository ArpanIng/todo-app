import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsPlusLg } from "react-icons/bs";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Todo from "./Todo";
import TodoFormModal from "./TodoFormModal";
import { useChoices } from "../contexts/choicesContext";
import {
  createTodo,
  deleteTodo,
  fetchTodo,
  fetchTodos,
  updateTodo,
  updateTodoCompletedStatus,
} from "../services/todoService";
import { getChoiceValue } from "../utils";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { todoPriorityChoices, todoStatusChoices } = useChoices();

  // modals
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const initialValues = {
    name: todo?.name || "",
    description: todo?.description || "",
    priority: getChoiceValue(todoPriorityChoices, todo?.priority),
    status: getChoiceValue(todoStatusChoices, todo?.status),
    dueDate: todo?.due_date || null,
    isCompleted: todo?.is_completed ?? false, // Nullish Coalescing Operator
  };

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await fetchTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const OpenTodoAddModal = () => {
    setOpenModal(true);
    setTodo(null);
  };

  const openTodoEditModal = async (todoId) => {
    setLoading(true);
    setTodo(null);
    try {
      const response = await fetchTodo(todoId);
      setTodo(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const OpenTodoDeleteModal = (todoId) => {
    setTodo(todoId);
    setOpenDeleteModal(true);
  };

  const handleSubmit = async (data) => {
    // to match backend naming case
    const formData = {
      name: data.name,
      description: data.description,
      priority: data.priority,
      status: data.status,
      due_date: data.dueDate,
      is_completed: data.isCompleted,
    };
    setLoading(true);
    try {
      let response;
      if (todo?.id) {
        response = await updateTodo(todo.id, formData);
      } else {
        response = await createTodo(data);
      }
      if (response.status === 200 || response.status === 201) {
        setOpenModal(false);
        getTodos();
      }
    } catch (error) {
      console.error("Error submitting todo:", error);
      if (error.response) {
        const errorData = error.response.data;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    setOpenDeleteModal(false);
    setTodo(null);
  };

  const handleIsCompletedToggle = async (todoId, value) => {
    try {
      const response = await updateTodoCompletedStatus(todoId, !value);
      // Update the local state after the update
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === todoId
            ? { ...todo, is_completed: response.data.is_completed }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo completed status:", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end my-2">
        <Button
          variant="success"
          data-bs-toggle="modal"
          data-bs-target="#todo-form-modal"
          onClick={OpenTodoAddModal}
        >
          <BsPlusLg className="me-2 mb-1" />
          New
        </Button>
      </div>

      {/* todo item */}
      <div className="vstack gap-2">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggleComplete={handleIsCompletedToggle}
            openEditModal={openTodoEditModal}
            openDeleteModal={OpenTodoDeleteModal}
          />
        ))}
      </div>

      {/* todo form modal */}
      <TodoFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        initialData={initialValues}
        onSubmit={handleSubmit}
        todoPriorityChoices={todoPriorityChoices}
        todoStatusChoices={todoStatusChoices}
        isEditMode={!!todo} // double-negation
      />

      {/* todo delete modal */}
      <DeleteConfirmModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        handleDelete={() => handleDelete(todo)}
      />
    </>
  );
}

export default TodoList;
