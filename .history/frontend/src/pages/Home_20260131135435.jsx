// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../services/api";

// // export default function Home() {
// //   const [repoUrl, setRepoUrl] = useState("");
// //   const navigate = useNavigate();

// //   const analyzeRepo = async () => {
// //     if (!repoUrl.trim()) {
// //       alert("Please enter GitHub repo URL");
// //       return;
// //     }

// //     try {
// //       const res = await api.post("/analyze/submit", { repoUrl });
// //       navigate(`/dashboard/${res.data.jobId}`);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Submit failed");
// //     }
// //   };

// //   return (
// //     <div style={styles.page}>
// //       <div style={styles.card}>
// //         <h1 style={styles.title}>🚀 AI DevOps Assistant</h1>
// //         <p style={styles.subtitle}>
// //           Analyze your GitHub repository with AI-powered insights
// //         </p>

// //         <input
// //           value={repoUrl}
// //           onChange={(e) => setRepoUrl(e.target.value)}
// //           placeholder="https://github.com/username/repo"
// //           style={styles.input}
// //         />

// //         <button style={styles.button} onClick={analyzeRepo}>
// //           Analyze Repository
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   page: {
// //     height: "100vh",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     background: "linear-gradient(135deg, #667eea, #764ba2)",
// //     fontFamily: "Inter, sans-serif",
// //   },

// //   card: {
// //     background: "rgba(255, 255, 255, 0.15)",
// //     backdropFilter: "blur(12px)",
// //     padding: "40px",
// //     borderRadius: "16px",
// //     width: "420px",
// //     textAlign: "center",
// //     boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
// //     color: "#fff",
// //   },

// //   title: {
// //     marginBottom: "10px",
// //     fontSize: "28px",
// //     fontWeight: "700",
// //   },

// //   subtitle: {
// //     fontSize: "14px",
// //     opacity: 0.9,
// //     marginBottom: "25px",
// //   },

// //   input: {
// //     width: "100%",
// //     padding: "12px 14px",
// //     borderRadius: "10px",
// //     border: "none",
// //     outline: "none",
// //     fontSize: "14px",
// //     marginBottom: "20px",
// //   },

// //   button: {
// //     width: "100%",
// //     padding: "12px",
// //     borderRadius: "10px",
// //     border: "none",
// //     cursor: "pointer",
// //     fontWeight: "600",
// //     fontSize: "15px",
// //     color: "#fff",
// //     background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
// //     transition: "transform 0.2s ease, box-shadow 0.2s ease",
// //   },
// // };

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function Home() {
//   const [repoUrl, setRepoUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [jobId, setJobId] = useState(null);
//   const navigate = useNavigate();

//   const analyzeRepo = async () => {
//     if (!repoUrl.trim()) {
//       alert("Please enter GitHub repo URL");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/analyze/submit", { repoUrl });
//       const id = res.data.jobId;
//       setJobId(id);

//       // Start polling the job status
//       pollStatus(id);
//     } catch (err) {
//       console.error("Submit failed:", err.response || err);
//       alert("Submit failed");
//       setLoading(false);
//     }
//   };

//   const pollStatus = async (id) => {
//     try {
//       const interval = setInterval(async () => {
//         const statusRes = await api.get(`/analyze/status/${id}`);
//         const statusData = statusRes.data;

//         console.log("Job Status:", statusData);

//         if (statusData.status === "completed") {
//           clearInterval(interval);
//           setLoading(false);
//           navigate(`/dashboard/${id}`);
//         }
//       }, 2000); // poll every 2 seconds
//     } catch (err) {
//       console.error("Error polling status:", err);
//       setLoading(false);
//       alert("Failed to fetch job status");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h1 style={styles.title}>🚀 AI DevOps Assistant</h1>
//         <p style={styles.subtitle}>
//           Analyze your GitHub repository with AI-powered insights
//         </p>

//         <input
//           value={repoUrl}
//           onChange={(e) => setRepoUrl(e.target.value)}
//           placeholder="https://github.com/username/repo"
//           style={styles.input}
//           disabled={loading}
//         />

//         <button style={styles.button} onClick={analyzeRepo} disabled={loading}>
//           {loading ? "Analyzing..." : "Analyze Repository"}
//         </button>

//         {loading && jobId && (
//           <p style={{ marginTop: "15px", fontSize: "14px", opacity: 0.8 }}>
//             Job ID: {jobId} – Processing...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #667eea, #764ba2)",
//     fontFamily: "Inter, sans-serif",
//   },

//   card: {
//     background: "rgba(255, 255, 255, 0.15)",
//     backdropFilter: "blur(12px)",
//     padding: "40px",
//     borderRadius: "16px",
//     width: "420px",
//     textAlign: "center",
//     boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
//     color: "#fff",
//   },

//   title: {
//     marginBottom: "10px",
//     fontSize: "28px",
//     fontWeight: "700",
//   },

//   subtitle: {
//     fontSize: "14px",
//     opacity: 0.9,
//     marginBottom: "25px",
//   },

//   input: {
//     width: "100%",
//     padding: "12px 14px",
//     borderRadius: "10px",
//     border: "none",
//     outline: "none",
//     fontSize: "14px",
//     marginBottom: "20px",
//   },

//   button: {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "10px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "15px",
//     color: "#fff",
//     background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
//     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//   },
// };

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // ===== Check if user is logged in =====
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login"); // redirect to login if not authenticated
  }, [navigate]);

  const analyzeRepo = async () => {
    if (!repoUrl.trim()) {
      alert("Please enter GitHub repo URL");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);
      const res = await api.post("/analyze/submit", { repoUrl });
      const id = res.data.jobId;
      setJobId(id);

      // Start polling the job status
      pollStatus(id);
    } catch (err) {
      console.error("Submit failed:", err.response || err);
      alert("Submit failed");
      setLoading(false);
    }
  };

  const pollStatus = (id) => {
    const interval = setInterval(async () => {
      try {
        const statusRes = await api.get(`/analyze/status/${id}`);
        const statusData = statusRes.data;

        // Update progress
        setProgress(statusData.progress || 0);

        if (statusData.status === "completed") {
          clearInterval(interval);
          setLoading(false);
          navigate(`/dashboard/${id}`);
        }
      } catch (err) {
        console.error("Error polling status:", err);
        clearInterval(interval);
        setLoading(false);
        alert("Failed to fetch job status");
      }
    }, 1000); // poll every 1 second for smoother progress
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 AI DevOps Assistant</h1>
        <p style={styles.subtitle}>
          Analyze your GitHub repository with AI-powered insights
        </p>

        <input
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repo"
          style={styles.input}
          disabled={loading}
        />

        <button style={styles.button} onClick={analyzeRepo} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Repository"}
        </button>

        {loading && jobId && (
          <div style={{ marginTop: "15px" }}>
            <p style={{ fontSize: "14px", opacity: 0.8 }}>
              Job ID: {jobId} – Processing...
            </p>
            <div style={styles.progressBarContainer}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${progress}%`,
                }}
              />
            </div>
            <p style={{ fontSize: "12px", opacity: 0.7 }}>{progress}% completed</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Inter, sans-serif",
  },

  card: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "16px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    color: "#fff",
  },

  title: {
    marginBottom: "10px",
    fontSize: "28px",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: "14px",
    opacity: 0.9,
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    marginBottom: "20px",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    color: "#fff",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  progressBarContainer: {
    width: "100%",
    height: "10px",
    borderRadius: "5px",
    background: "rgba(255,255,255,0.3)",
    marginTop: "10px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    borderRadius: "5px",
    transition: "width 0.3s ease",
  },
};
