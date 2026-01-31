import { useState } from "react";
import api from "../services/api";

export default function RepoChat({ jobId }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question) return;

    setLoading(true);
    setMessages([...messages, { role: "user", text: question }]);

    const res = await api.post("/chat/ask", {
      jobId,
      question,
    });

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: res.data.answer },
    ]);

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>🤖 Repo Chat</h3>

      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.role === "user" ? "You" : "AI"}:</b>
            <pre>{m.text}</pre>
          </div>
        ))}
      </div>

      <input
        placeholder="Ask about architecture, security, CI/CD..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={askQuestion} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>
    </div>
  );
}
