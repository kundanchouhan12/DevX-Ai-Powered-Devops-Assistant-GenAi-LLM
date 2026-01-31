import axios from "axios";

/**
 * Smart baseURL selection:
 * - ENV set → use it
 * - localhost → 127.0.0.1
 * - production → relative /api
 */
const getBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  } else if (window.location.hostname === "localhost") {
    return "http://127.0.0.1:5000/api";
  } else {
    return "/api";
  }
};

const api = axios.create({
  baseURL: getBaseURL(),
});

/* ======================
   JWT Interceptor
====================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   Auth APIs
====================== */
export const signup = (email, password) =>
  api.post("/auth/signup", { email, password });

export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const googleLogin = (token) =>
  api.post("/auth/google", { token });

/* ======================
   Default export
====================== */
export default api;
