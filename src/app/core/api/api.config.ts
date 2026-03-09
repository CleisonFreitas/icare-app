import axios from "axios";
import { handleApiError } from "./handle.api.errors";

export const ApiConfig = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

ApiConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

ApiConfig.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    handleApiError(error);
    return Promise.reject(error);
  }
);