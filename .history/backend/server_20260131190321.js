// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const analyzeRoutes = require("./routes/analyze");

// const app = express();

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "http://127.0.0.1:5173", // <- optional
//     "http://127.0.0.1:5174",
//     "http://127.0.0.1:5173" // <- optional
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type"],
// }));

// // app.use(express.json());
// const authRoutes = require("./routes/auth");
// // app.use("/api/auth", authRoutes);

// // app.use("/api/analyze", analyzeRoutes);

// app.use(cors());
// app.use(express.json()); // 🔴 VERY IMPORTANT

// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/analyze", require("./routes/analyze"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Backend running on port ${PORT}`)
// );

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const analyzeRoutes = require("./routes/analyze");
// const authRoutes = require("./routes/auth");   // 👈 ADD THIS

// const app = express();

// /* ================= CORS ================= */
// app.use(
//   cors({
//     origin: [
("http://127.0.0.1:5173",
  //       "http://localhost:5173",
  //       "http://localhost:5174",
  //       "http://127.0.0.1:5173",
  //       "http://127.0.0.1:5174",
  //     ],
  //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //     allowedHeaders: ["Content-Type", "Authorization"],
  //   })
  // );

  // app.use(express.json());

  // // ROUTES
  // app.use("/api/analyze", analyzeRoutes);
  // app.use("/api/auth", authRoutes);   // 👈 ADD THIS

  // const PORT = process.env.PORT || 5000;
  // app.listen(PORT, () =>
  //   console.log(`🚀 Backend running on port ${PORT}`)
  // );
  require("dotenv").config());
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const analyzeRoutes = require("./routes/analyze");

const app = express();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
