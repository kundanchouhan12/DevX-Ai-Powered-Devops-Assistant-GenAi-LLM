import ReactMarkdown from "react-markdown";

export default function ResultMarkdown({ report }) {
  if (!report) return null;

  return (
    <div className="card">
      <ReactMarkdown>{report}</ReactMarkdown>
    </div>
  );
}
