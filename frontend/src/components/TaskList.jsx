import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsPlusLg } from "react-icons/bs";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Task from "./Task";
import TaskFormModal from "./TaskFormModal";
import { useChoices } from "../contexts/choicesContext";
import {
  createTask,
  deleteTask,
  fetchTask,
  updateTask,
  updateTaskCompletedStatus,
} from "../services/taskService";
import { userTasks } from "../services/userService";
import { getChoiceValue } from "../utils";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const { taskPriorityChoices, taskStatusChoices } = useChoices();

  // modals
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const initialValues = {
    name: task?.name || "",
    description: task?.description || "",
    priority: getChoiceValue(taskPriorityChoices, task?.priority),
    status: getChoiceValue(taskStatusChoices, task?.status),
    dueDate: task?.due_date || null,
    isCompleted: task?.is_completed ?? false, // Nullish Coalescing Operator
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await userTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const OpenTaskAddModal = () => {
    setOpenModal(true);
    setTask(null);
  };

  const openTaskEditModal = async (taskId) => {
    setLoading(true);
    setTask(null);
    try {
      const response = await fetchTask(taskId);
      setTask(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  const OpenTaskDeleteModal = (taskId) => {
    setTask(taskId);
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
      if (task?.id) {
        response = await updateTask(task.id, formData);
      } else {
        response = await createTask(data);
      }
      if (response.status === 200 || response.status === 201) {
        setOpenModal(false);
        getTasks();
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      if (error.response) {
        const errorData = error.response.data;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setOpenDeleteModal(false);
    setTask(null);
  };

  const handleIsCompletedToggle = async (taskId, value) => {
    try {
      const response = await updateTaskCompletedStatus(taskId, !value);
      // Update the local state after the update
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, is_completed: response.data.is_completed }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task completed status:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end my-2">
        <Button
          variant="success"
          data-bs-toggle="modal"
          data-bs-target="#task-form-modal"
          onClick={OpenTaskAddModal}
        >
          <BsPlusLg className="me-2 mb-1" />
          New
        </Button>
      </div>

      {/* task item */}
      <div className="vstack gap-2">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleComplete={handleIsCompletedToggle}
            openEditModal={openTaskEditModal}
            openDeleteModal={OpenTaskDeleteModal}
          />
        ))}
      </div>

      {/* task form modal */}
      <TaskFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        initialData={initialValues}
        onSubmit={handleSubmit}
        taskPriorityChoices={taskPriorityChoices}
        taskStatusChoices={taskStatusChoices}
        isEditMode={!!task} // double-negation
      />

      {/* task delete modal */}
      <DeleteConfirmModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        handleDelete={() => handleDelete(task)}
      />
    </>
  );
}

export default TaskList;
