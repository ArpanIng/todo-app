import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTasksStatusChoices,
  fetchTasksPriorityChoices,
  fetchNotificationTypeChoices,
  fetchNotificationTimeUnitChoices,
} from "../services/taskService";

export const ChoicesContext = createContext();

function ChoicesProvider({ children }) {
  const [taskPriorityChoices, setTaskPriorityChoices] = useState([]);
  const [taskStatusChoices, setTaskStatusChoices] = useState([]);
  const [notificationTypeChoices, setNotificationTypeChoices] = useState([]);
  const [notificationTimeUnitChoices, setNotificationTimeUnitChoices] =
    useState([]);
  const [loading, setLoading] = useState(false);

  const getTaskPriorityChoices = async () => {
    try {
      const response = await fetchTasksPriorityChoices();
      setTaskPriorityChoices(response.data.choices);
    } catch (error) {
      console.error("Error fetching task priority choices:", error);
    }
  };

  const getTaskStatusChoices = async () => {
    try {
      const response = await fetchTasksStatusChoices();
      setTaskStatusChoices(response.data.choices);
    } catch (error) {
      console.error("Error fetching task priority choices:", error);
    }
  };

  const getNotificationTypeChoices = async () => {
    try {
      const response = await fetchNotificationTypeChoices();
      setNotificationTypeChoices(response.data.choices);
    } catch (error) {
      console.error("Error fetching notification type choices:", error);
    }
  };

  const getNotificationTimeUnitChoices = async () => {
    try {
      const response = await fetchNotificationTimeUnitChoices();
      setNotificationTimeUnitChoices(response.data.choices);
    } catch (error) {
      console.error("Error fetching notification time unit choices:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      getTaskPriorityChoices(),
      getTaskStatusChoices(),
      getNotificationTypeChoices(),
      getNotificationTimeUnitChoices(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChoicesContext.Provider
      value={{
        taskPriorityChoices,
        taskStatusChoices,
        notificationTypeChoices,
        notificationTimeUnitChoices,
      }}
    >
      {children}
    </ChoicesContext.Provider>
  );
}

export default ChoicesProvider;

export const useChoices = () => {
  return useContext(ChoicesContext);
};
