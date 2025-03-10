import api from "../api/endpoint";

/*
Fetch request user todos
*/
export const userTodos = async () => {
  const response = await api.get("/api/users/me/todos/");
  return response;
};
