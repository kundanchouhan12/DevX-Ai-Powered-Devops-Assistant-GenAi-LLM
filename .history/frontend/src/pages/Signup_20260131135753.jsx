import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await signup(email, password);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect after signup
    } catch (err) {
      console.error(err);
      alert(err.response?.data.error || "Signup failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🚀 Create Account</h1>
        <p style={subtitleStyle}>Sign up to access your AI DevOps dashboard</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button style={buttonStyle} onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

/* Styles */
const pageStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(12px)",
  padding: "40px",
  borderRadius: "16px",
  width: "360px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  textAlign: "center",
  color: "#fff",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "8px",
};

const subtitleStyle = {
  fontSize: "14px",
  opacity: 0.85,
  marginBottom: "25px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  marginBottom: "20px",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "#fff",
  transition: "0.3s",
};

const buttonStyle = {
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
  marginTop: "10px",
};
