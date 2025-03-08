import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTodosStatusChoices,
  fetchTodosPriorityChoices,
} from "../services/todoService";

export const ChoicesContext = createContext();

function ChoicesProvider({ children }) {
  const [todoPriorityChoices, setTodoPriorityChoices] = useState([]);
  const [todoStatusChoices, setTodoStatusChoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTodoPriorityChoices = async () => {
    try {
      const response = await fetchTodosPriorityChoices();
      setTodoPriorityChoices(response.data.choices);
    } catch (error) {
      console.error("Error fetching todo priority choices:", error);
    }
  };

  const getTodoStatusChoices = async () => {
    try {
      const response = await fetchTodosStatusChoices();
      setTodoStatusChoices(response.data.choices);
    } catch (error) {
      console.error("Error fetching todo priority choices:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([getTodoPriorityChoices(), getTodoStatusChoices()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChoicesContext.Provider value={{ todoPriorityChoices, todoStatusChoices }}>
      {children}
    </ChoicesContext.Provider>
  );
}

export default ChoicesProvider;

export const useChoices = () => {
  return useContext(ChoicesContext);
};
