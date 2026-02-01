import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// JWT interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth APIs
export const signup = (email, password) =>
  api.post("/auth/signup", { email, password });

export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const googleLogin = (token) =>
  api.post("/auth/google", { token });

export default api;
