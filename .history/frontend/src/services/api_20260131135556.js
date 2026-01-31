import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  } else if (window.location.hostname === "localhost") {
    return "http://127.0.0.1:5000/api";
  } else {
    return "/api"; // production relative path
  }
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// JWT interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ===== Auth functions =====
export const signup = (email, password) => api.post("/auth/signup", { email, password });
export const login = (email, password) => api.post("/auth/login", { email, password });

// Export default axios instance for other requests
export default api;
