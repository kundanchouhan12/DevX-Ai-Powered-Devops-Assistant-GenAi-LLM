export default function Status({ status }) {
  if (!status) return null;

  const map = {
    waiting: "⏳ In queue...",
    active: "🔍 Scanning repository...",
    completed: "✅ Analysis completed",
    failed: "❌ Analysis failed",
  };

  return <p className="status">{map[status]}</p>;
}
