import { useState } from "react";

export default function RepoForm({ onSubmit }) {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(repoUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="GitHub Repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ width: "400px", padding: 10 }}
        required
      />
      <button style={{ marginLeft: 10, padding: 10 }}>
        Analyze
      </button>
    </form>
  );
}
