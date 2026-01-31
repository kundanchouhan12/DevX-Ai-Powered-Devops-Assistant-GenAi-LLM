import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email) return setError("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Invalid email");
    if (!password) return setError("Password is required");

    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🚀 Welcome Back</h1>
        <p style={subtitleStyle}>Login to access your AI DevOps dashboard</p>

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

        <button style={buttonStyle} onClick={handleLogin}>
          Login
        </button>

        <button style={googleButton}>
          🔵 Continue with Google
        </button>

        <p style={footerText}>
          Don’t have an account?{" "}
          <span style={linkStyle} onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
