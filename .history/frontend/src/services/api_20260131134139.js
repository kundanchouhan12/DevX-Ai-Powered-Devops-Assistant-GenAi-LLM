// // export default api;
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:5000/api", // <- match what Postman works with
// });

// export default api;

import axios from "axios";

/**
 * Smart baseURL selection:
 * 1. Use environment variable if defined (VITE_API_BASE_URL)
 * 2. If running on localhost, fallback to local backend (127.0.0.1:5000)
 * 3. Otherwise, use relative path `/api` for cloud deployment
 */
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

export default api;
