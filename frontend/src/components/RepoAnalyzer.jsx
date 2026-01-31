import { useState } from "react";
import axios from "axios";

export default function RepoAnalyzer({ onJobCreated }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRepo = async () => {
    setLoading(true);
    const res = await axios.post("http://localhost:5000/api/analyze/submit", {
      repoUrl,
      userId: "123"
    });

    onJobCreated(res.data.jobId);
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>🔗 Analyze GitHub Repository</h2>

      <input
        type="text"
        placeholder="https://github.com/username/repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button onClick={submitRepo} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
