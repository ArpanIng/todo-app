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

  const handleUserRegister = async ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      await api.post("/api/register/", {
        username: username,
        email: email,
        password: password,
        password2: confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response) {
        const errorData = error.response.data;
        // map backend errors to formik
        const errors = {};
        Object.keys(errorData).forEach((field) => {
          // handle non-field errors
          if (field === "non_field_errors") {
            errors.nonFieldErrors = errorData[field].join("");
          } else if (field == "detail") {
            errors.detail = errorData[field].join("");
          } else {
            // handle field errors
            errors[field] = errorData[field].join("");
          }
        });
        throw errors; // to handle in formik onSubmit
      }
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        const errorData = error.response.data;
        // map backend errors to formik
        const errors = {};
        if (errorData.detail) {
          errors.detail = errorData.detail;
        }
        throw errors;
      }
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
