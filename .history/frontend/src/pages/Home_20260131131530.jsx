import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const navigate = useNavigate();

  const analyzeRepo = async () => {
    if (!repoUrl.trim()) {
      alert("Please enter GitHub repo URL");
      return;
    }

    try {
      const res = await api.post("/analyze/submit", { repoUrl });
      navigate(`/dashboard/${res.data.jobId}`);
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
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
        />

        <button style={styles.button} onClick={analyzeRepo}>
          Analyze Repository
        </button>
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
};
