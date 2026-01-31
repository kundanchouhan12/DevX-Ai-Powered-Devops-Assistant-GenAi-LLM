import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Alert,
  Divider,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import CodeIcon from "@mui/icons-material/Code";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const { jobId } = useParams();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("queued");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  /* 🔁 Poll STATUS */
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/analyze/status/${jobId}`);

        setStatus(res.data.status);
        setProgress(res.data.progress ?? 0);

        if (res.data.status === "completed") {
          clearInterval(interval);

          // 🔥 fetch FINAL RESULT
          const resultRes = await api.get(`/analyze/result/${jobId}`);
          setData(resultRes.data);
        }

        if (res.data.status === "failed") {
          setError(res.data.error || "Analysis failed");
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        setError("Backend not reachable");
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  /* ⏳ LOADING */
  if (!data && !error) {
    return (
      <Box sx={pageStyle}>
        <Alert severity="info" sx={{ mb: 2 }}>
          🔍 Analyzing repository…
        </Alert>
        <LinearProgress variant="determinate" value={progress} />
        <Typography sx={{ mt: 2, opacity: 0.7 }}>
          Status: {status} ({progress}%)
        </Typography>
      </Box>
    );
  }

  /* ❌ ERROR */
  if (error) {
    return (
      <Box sx={pageStyle}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  /* 📊 PIE DATA SAFE */
  const extensionsData = Object.entries(data.extensions || {}).map(
    ([key, value]) => ({
      name: key || "config",
      value,
    })
  );

  return (
    <Box sx={pageStyle}>
      {/* STATUS */}
      <Alert severity="success" sx={{ mb: 3 }}>
        ✅ Analysis completed successfully
      </Alert>

      {/* STATS */}
      <Grid container spacing={3}>
        <StatCard icon={<FolderIcon />} label="Files" value={data.files} />
        <StatCard icon={<CodeIcon />} label="Lines of Code" value={data.lines} />
        <StatCard icon={<SmartToyIcon />} label="Repo" value="AI Analyzed" />
      </Grid>

      {/* TECH STACK */}
      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant="h6">🧩 Tech Stack</Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
            {extensionsData.map((ext) => (
              <Chip
                key={ext.name}
                label={`${ext.name} (${ext.value})`}
                sx={chipStyle}
              />
            ))}
          </Box>

          {extensionsData.length > 0 && (
            <Box sx={{ height: 260, mt: 4 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={extensionsData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* AI REPORT */}
      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant="h6">🧠 AI Insights</Typography>
          <Divider sx={{ my: 2 }} />
          <ReactMarkdown>
            {data.aiReport || "No AI insights generated."}
          </ReactMarkdown>
        </CardContent>
      </Card>

      {/* WARNINGS */}
      {data.aiReport?.includes("Nested Git") && (
        <Card sx={{ ...cardStyle, borderLeft: "5px solid #ef4444" }}>
          <CardContent>
            <Typography variant="h6" color="error">
              ⚠️ Critical Warning
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Nested Git repository detected. This can break CI/CD pipelines.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

/* 🔹 Stat Card */
function StatCard({ icon, label, value }) {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {icon}
            <Box>
              <Typography variant="h5">{value}</Typography>
              <Typography variant="body2">{label}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

/* 🎨 Styles */
const pageStyle = {
  minHeight: "100vh",
  bgcolor: "#0f172a",
  color: "#e5e7eb",
  p: 4,
};

const cardStyle = {
  bgcolor: "#020617",
  color: "#e5e7eb",
  borderRadius: 3,
  mb: 4,
};

const chipStyle = {
  m: 0.5,
  bgcolor: "#1e293b",
  color: "#e5e7eb",
};
