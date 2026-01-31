import React from "react";

export default function ProgressBar({ status }) {
  let color = "#3498db"; // default blue
  let label = "Queued";

  if (status === "processing") {
    color = "#f1c40f"; // yellow
    label = "Processing...";
  } else if (status === "completed") {
    color = "#2ecc71"; // green
    label = "Completed";
  } else if (status === "failed") {
    color = "#e74c3c"; // red
    label = "Failed";
  }

  return (
    <div style={{ margin: "20px 0" }}>
      <div
        style={{
          height: 25,
          width: "100%",
          backgroundColor: "#ecf0f1",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width:
              status === "queued"
                ? "25%"
                : status === "processing"
                ? "60%"
                : status === "completed"
                ? "100%"
                : "100%",
            backgroundColor: color,
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>
      <div style={{ marginTop: 5, fontWeight: "bold", color }}>{label}</div>
    </div>
  );
}
