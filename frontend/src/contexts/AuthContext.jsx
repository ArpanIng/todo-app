import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../api/constants";
import api from "../api/endpoint";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth();
  }, []);

  const handleRefreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthenticated(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // seconds

    // token is expired
    if (tokenExpiration < now) {
      await handleRefreshToken();
    } else {
      setIsAuthenticated(true); // user is logged in
    }
  };

  const handleUserRegister = async (
    username,
    email,
    password,
    confirmPassword
  ) => {
    try {
      await api.post("/api/register/", {
        username: username,
        email: email,
        password: password,
        password2: confirmPassword,
      });
      await handleLogin(username, password);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleUserRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
