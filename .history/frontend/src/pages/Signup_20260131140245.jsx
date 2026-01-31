import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

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
