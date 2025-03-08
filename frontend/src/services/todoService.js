import api from "../api/endpoint";

export const fetchTodos = async () => {
  const response = await api.get("/api/todos/");
  return response;
};

export const createTodo = async (data) => {
  const response = await api.post("/api/todos/", data);
  return response;
};

export const fetchTodo = async (todoId) => {
  const response = await api.get(`/api/todos/${todoId}/`);
  return response;
};

export const updateTodo = async (todoId, data) => {
  const response = await api.put(`/api/todos/${todoId}/`, data);
  return response;
};

export const deleteTodo = async (todoId) => {
  const response = await api.delete(`/api/todos/${todoId}/`);
  return response;
};

export const updateTodoCompletedStatus = async (todoId, isCompleted) => {
  const response = await api.patch(`/api/todos/${todoId}/`, {
    is_completed: isCompleted,
  });
  return response;
};

export const fetchTodosPriorityChoices = async () => {
  const response = await api.get("/api/todos/priority-choices/");
  return response;
};

export const fetchTodosStatusChoices = async () => {
  const response = await api.get("/api/todos/status-choices/");
  return response;
};
