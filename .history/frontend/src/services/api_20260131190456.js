// import axios from "axios";

// const getBaseURL = () => {
//   if (import.meta.env.VITE_API_BASE_URL) {
//     return import.meta.env.VITE_API_BASE_URL;
//   } else if (window.location.hostname === "localhost") {
//     return "http://127.0.0.1:5000/api";
//   } else {
//     return "/api";
//   }
// };

// const api = axios.create({ baseURL: getBaseURL() });

// // JWT interceptor
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Auth endpoints
// export const signup = (email, password) => api.post("/auth/signup", { email, password });
// export const login = (email, password) => api.post("/auth/login", { email, password });
// export const googleLogin = (token) => api.post("/auth/google", { token });


import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Auth endpoints
export const signup = (email, password) => api.post("/auth/signup", { email, password });
export const login = (email, password) => api.post("/auth/login", { email, password });
export const googleLogin = (token) => api.post("/auth/google", { token });

export default api;
