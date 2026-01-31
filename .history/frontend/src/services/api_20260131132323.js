// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL + "/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // <- match what Postman works with
});

export default api;
