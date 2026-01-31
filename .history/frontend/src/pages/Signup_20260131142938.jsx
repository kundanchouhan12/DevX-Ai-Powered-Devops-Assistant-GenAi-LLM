import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, googleLogin } from "../services/api";
import { GoogleLogin } from "@react-oauth/google";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");

    if (!email) return setError("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Invalid email");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    try {
      const res = await signup(email, password);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🚀 Create Account</h1>
        <p style={subtitleStyle}>Sign up to access your AI DevOps dashboard</p>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <div style={passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: 0 }}
          />
          <span
            style={eyeStyle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button style={buttonStyle} onClick={handleSignup}>
          Sign Up
        </button>

        <button style={googleButton}>
          🔵 Continue with Google
        </button>

        <p style={footerText}>
          Already have an account?{" "}
          <span style={linkStyle} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
const pageStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  padding: "40px",
  borderRadius: "16px",
  width: "360px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  textAlign: "center",
  color: "#fff",
};

const titleStyle = { fontSize: 28, fontWeight: 700 };
const subtitleStyle = { fontSize: 14, opacity: 0.85, marginBottom: 20 };

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  marginBottom: "20px",
  backgroundColor: "rgba(255,255,255,0.9)",
  color: "#000",
};

const passwordWrapper = {
  position: "relative",
  marginBottom: "20px",
};

const eyeStyle = {
  position: "absolute",
  right: 12,
  top: 12,
  cursor: "pointer",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
  color: "#fff",
  background: "linear-gradient(135deg,#ff758c,#ff7eb3)",
  marginBottom: "10px",
};

const googleButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#000",
  fontWeight: 600,
  cursor: "pointer",
};

const errorStyle = {
  color: "#ffb4b4",
  fontSize: 13,
  marginBottom: 10,
};

const footerText = { marginTop: 15, fontSize: 14 };
const linkStyle = { textDecoration: "underline", cursor: "pointer" };
