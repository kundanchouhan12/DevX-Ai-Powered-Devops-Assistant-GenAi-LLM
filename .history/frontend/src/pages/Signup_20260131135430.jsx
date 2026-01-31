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
    <div>
      <h1>Signup</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
