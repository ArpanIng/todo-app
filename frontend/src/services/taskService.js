import api from "../api/endpoint";

export const fetchTasks = async () => {
  const response = await api.get("/api/tasks/");
  return response;
};

export const createTask = async (data) => {
  const response = await api.post("/api/tasks/", data);
  return response;
};

export const fetchTask = async (taskId) => {
  const response = await api.get(`/api/tasks/${taskId}/`);
  return response;
};

export const updateTask = async (taskId, data) => {
  const response = await api.put(`/api/tasks/${taskId}/`, data);
  return response;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/api/tasks/${taskId}/`);
  return response;
};

export const updateTaskCompletedStatus = async (taskId, isCompleted) => {
  const response = await api.patch(`/api/tasks/${taskId}/`, {
    is_completed: isCompleted,
  });
  return response;
};

export const fetchTasksPriorityChoices = async () => {
  const response = await api.get("/api/tasks/priority-choices/");
  return response;
};

export const fetchTasksStatusChoices = async () => {
  const response = await api.get("/api/tasks/status-choices/");
  return response;
};
