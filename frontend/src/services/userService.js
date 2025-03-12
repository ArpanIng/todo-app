import api from "../api/endpoint";

/*
Fetch request user tasks
*/
export const userTasks = async () => {
  const response = await api.get("/api/users/me/tasks/");
  return response;
};
