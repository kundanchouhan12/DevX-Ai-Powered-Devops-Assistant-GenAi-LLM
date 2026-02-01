// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   LinearProgress,
//   Alert,
//   Divider,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import FolderIcon from "@mui/icons-material/Folder";
// import CodeIcon from "@mui/icons-material/Code";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import { PieChart, Pie, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
// import ReactMarkdown from "react-markdown";
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../services/api";

// const COLORS = ["#3b82f6", "#facc15", "#ef4444", "#22c55e", "#8b5cf6", "#fb7185"];

// export default function Dashboard() {
//   const { jobId } = useParams();
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);
//   const [status, setStatus] = useState("queued");
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);

//   // 🔴 Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   /* ================= Poll STATUS ================= */
//   useEffect(() => {
//     if (!jobId) return;
//     const interval = setInterval(async () => {
//       try {
//         const res = await api.get(`/analyze/status/${jobId}`);
//         setStatus(res.data.status);
//         setProgress(res.data.progress ?? 0);

//         if (res.data.status === "completed") {
//           clearInterval(interval);
//           const resultRes = await api.get(`/analyze/result/${jobId}`);
//           setData(resultRes.data);
//         }

//         if (res.data.status === "failed") {
//           setError(res.data.error || "Analysis failed");
//           clearInterval(interval);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Backend not reachable");
//         clearInterval(interval);
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [jobId]);

//   /* ================= Loading ================= */
//   if (!data && !error) {
//     return (
//       <Box sx={pageStyle}>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
//           <Tooltip title="Logout">
//             <IconButton color="error" onClick={handleLogout}>
//               <LogoutIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//         <Alert
//           severity="info"
//           sx={{
//             mb: 3,
//             bgcolor: "#1e3a8a",
//             color: "#bfdbfe",
//             fontWeight: 600,
//             textAlign: "center",
//           }}
//         >
//           🔍 Analyzing repository…
//         </Alert>
//         <LinearProgress
//           variant="determinate"
//           value={progress}
//           sx={{
//             height: 12,
//             borderRadius: 6,
//             backgroundColor: "#1e293b",
//             "& .MuiLinearProgress-bar": {
//               borderRadius: 6,
//               background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #facc15)",
//             },
//           }}
//         />
//         <Typography sx={{ mt: 2, textAlign: "center", fontWeight: 500, opacity: 0.8 }}>
//           Status: {status} ({progress}%)
//         </Typography>
//       </Box>
//     );
//   }

//   /* ================= Error ================= */
//   if (error) {
//     return (
//       <Box sx={pageStyle}>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
//           <Tooltip title="Logout">
//             <IconButton color="error" onClick={handleLogout}>
//               <LogoutIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   /* ================= Pie Data ================= */
//   const extensionsData = Object.entries(data.extensions || {}).map(([key, value]) => ({
//     name: key || "config",
//     value,
//   }));

//   return (
//     <Box sx={pageStyle}>
//       {/* 🔴 Logout button top-right */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
//         <Tooltip title="Logout">
//           <IconButton color="error" onClick={handleLogout}>
//             <LogoutIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>

//       {/* STATUS COMPLETED */}
//       <Alert
//         severity="success"
//         sx={{
//           mb: 3,
//           bgcolor: "#064e3b",
//           color: "#d1fae5",
//           fontWeight: 600,
//           textAlign: "center",
//         }}
//       >
//         ✅ Analysis completed successfully
//       </Alert>

//       {/* STATS */}
//       <Grid container spacing={3}>
//         <StatCard icon={<FolderIcon />} label="Files" value={data.files} />
//         <StatCard icon={<CodeIcon />} label="Lines of Code" value={data.lines} />
//         <StatCard icon={<SmartToyIcon />} label="Repo" value="AI Analyzed" />
//       </Grid>

//       {/* TECH STACK */}
//       <Card sx={{ ...cardStyle, border: "1px solid #334155", mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//             🧩 Tech Stack
//           </Typography>

//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//             {extensionsData.map((ext, i) => (
//               <Chip
//                 key={ext.name}
//                 label={`${ext.name} (${ext.value})`}
//                 sx={{
//                   bgcolor: "#1e293b",
//                   color: COLORS[i % COLORS.length],
//                   fontWeight: 500,
//                   px: 2,
//                   py: 0.5,
//                   transition: "transform 0.2s",
//                   "&:hover": { transform: "scale(1.1)" },
//                 }}
//               />
//             ))}
//           </Box>

//           {extensionsData.length > 0 && (
//             <Box sx={{ height: 260, mt: 4 }}>
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={extensionsData}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={90}
//                     animationDuration={800}
//                     animationEasing="ease-out"
//                   >
//                     {extensionsData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <RechartsTooltip
//                     contentStyle={{ backgroundColor: "#0f172a", borderRadius: 8 }}
//                     itemStyle={{ color: "#fff" }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Box>
//           )}
//         </CardContent>
//       </Card>

//       {/* AI REPORT */}
//       <Card sx={{ ...cardStyle, border: "1px solid #334155", mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//             🧠 AI Insights
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           <Box
//             sx={{
//               "& code": {
//                 backgroundColor: "#1e293b",
//                 color: "#facc15",
//                 px: 1,
//                 py: 0.5,
//                 borderRadius: 1,
//               },
//               "& p": { mb: 1.5 },
//               maxHeight: "400px",
//               overflowY: "auto",
//               pr: 1,
//               scrollbarWidth: "thin",
//               scrollbarColor: "#3b82f6 #1e293b",
//               "&::-webkit-scrollbar": { width: "8px" },
//               "&::-webkit-scrollbar-thumb": { backgroundColor: "#3b82f6", borderRadius: "4px" },
//               "&::-webkit-scrollbar-track": { backgroundColor: "#1e293b" },
//             }}
//           >
//             <ReactMarkdown>{data.aiReport || "No AI insights generated."}</ReactMarkdown>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* WARNINGS */}
//       {data.aiReport?.includes("Nested Git") && (
//         <Card sx={{ ...cardStyle, borderLeft: "5px solid #ef4444" }}>
//           <CardContent>
//             <Typography variant="h6" color="error">
//               ⚠️ Critical Warning
//             </Typography>
//             <Typography sx={{ mt: 1 }}>
//               Nested Git repository detected. This can break CI/CD pipelines.
//             </Typography>
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// }

// /* Stat Card */
// function StatCard({ icon, label, value }) {
//   return (
//     <Grid item xs={12} md={4}>
//       <Card
//         sx={{
//           ...cardStyle,
//           transition: "transform 0.3s, box-shadow 0.3s, background 0.3s",
//           "&:hover": {
//             transform: "translateY(-7px)",
//             boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
//             background: "linear-gradient(135deg, #0f172a, #1e293b)",
//           },
//         }}
//       >
//         <CardContent>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Box sx={{ fontSize: 36, color: "#3b82f6" }}>{icon}</Box>
//             <Box>
//               <Typography variant="h5" sx={{ fontWeight: 600 }}>
//                 {value}
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.7 }}>
//                 {label}
//               </Typography>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// }

// /* Styles */
// const pageStyle = {
//   minHeight: "100vh",
//   bgcolor: "#0f172a",
//   color: "#e5e7eb",
//   p: 4,
//   fontFamily: "Inter, sans-serif",
// };
// const cardStyle = {
//   bgcolor: "#020617",
//   color: "#e5e7eb",
//   borderRadius: 3,
//   mb: 4,
//   boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
// };

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
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import CodeIcon from "@mui/icons-material/Code";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { PieChart, Pie, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import api from "../services/api";

const COLORS = ["#3b82f6", "#facc15", "#ef4444", "#22c55e", "#8b5cf6", "#fb7185"];

export default function Dashboard() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("queued");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [showNewScan, setShowNewScan] = useState(false);
  const [newRepoUrl, setNewRepoUrl] = useState("");
  const [loadingScan, setLoadingScan] = useState(false);

  // ===== Decode JWT for current user =====
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode.default(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  // ===== Poll STATUS if jobId is present =====
  useEffect(() => {
    if (!jobId) return;
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/analyze/status/${jobId}`);
        setStatus(res.data.status);
        setProgress(res.data.progress ?? 0);

        if (res.data.status === "completed") {
          clearInterval(interval);
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

  // ===== Fetch user history and stats =====
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/analyze/history");
        setHistory(res.data.history);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await api.get("/analyze/stats");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
    fetchStats();
  }, []);

  // ===== Logout =====
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ===== Start New Scan =====
  const handleNewScan = async () => {
    if (!newRepoUrl.trim()) {
      alert("Please enter GitHub repo URL");
      return;
    }

    try {
      setLoadingScan(true);
      const res = await api.post("/analyze/submit", { repoUrl: newRepoUrl });
      const newJobId = res.data.jobId;
      setShowNewScan(false);
      setNewRepoUrl("");
      setLoadingScan(false);

      // Poll new job status
      const interval = setInterval(async () => {
        try {
          const statusRes = await api.get(`/analyze/status/${newJobId}`);
          const statusData = statusRes.data;
          if (statusData.status === "completed") {
            clearInterval(interval);
            const resultRes = await api.get(`/analyze/result/${newJobId}`);
            setData(resultRes.data);
            // Update history
            setHistory(prev => [
              {
                repo: newRepoUrl,
                date: new Date().toISOString().split("T")[0],
                status: "completed",
              },
              ...prev,
            ]);
          }
        } catch (err) {
          console.error(err);
          clearInterval(interval);
          alert("Failed to fetch job status");
        }
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoadingScan(false);
      alert("Scan failed");
    }
  };

  // ===== Loading UI =====
  if (!data && !error) {
    return (
      <Box sx={pageStyle}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Tooltip title="Logout">
            <IconButton color="error" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Alert
          severity="info"
          sx={{ mb: 3, bgcolor: "#1e3a8a", color: "#bfdbfe", fontWeight: 600, textAlign: "center" }}
        >
          🔍 Loading data…
        </Alert>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 12,
            borderRadius: 6,
            backgroundColor: "#1e293b",
            "& .MuiLinearProgress-bar": {
              borderRadius: 6,
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #facc15)",
            },
          }}
        />
      </Box>
    );
  }

  // ===== Error UI =====
  if (error) {
    return (
      <Box sx={pageStyle}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Tooltip title="Logout">
            <IconButton color="error" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // ===== Pie Data =====
  const extensionsData = Object.entries(data?.extensions || {}).map(([key, value]) => ({
    name: key || "config",
    value,
  }));

  return (
    <Box sx={pageStyle}>
      {/* Header with New Scan + Logout */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Welcome, {user?.email || "User"} 👋
        </Typography>
        <Box>
          <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => setShowNewScan(true)}>
            + New Scan
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* New Scan Modal */}
      {showNewScan && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Box sx={{ bgcolor: "#0f172a", p: 4, borderRadius: 3, minWidth: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🔍 Scan New GitHub Repo
            </Typography>
            <input
              value={newRepoUrl}
              onChange={(e) => setNewRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                marginBottom: "15px",
                outline: "none",
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button variant="contained" color="secondary" onClick={() => setShowNewScan(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleNewScan}>
                {loadingScan ? "Scanning..." : "Start Scan"}
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* STATS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <StatCard icon={<FolderIcon />} label="Files" value={data.files || 0} />
        <StatCard icon={<CodeIcon />} label="Lines of Code" value={data.lines || 0} />
        <StatCard icon={<SmartToyIcon />} label="Repo" value={data.repos || 0} />
        <StatCard icon={<SmartToyIcon />} label="Total Searches" value={history.length} />
      </Grid>

      {/* History */}
      <Card sx={{ ...cardStyle, border: "1px solid #334155", mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            📜 Recent History
          </Typography>
          {history.map((item, i) => (
            <Typography key={i} sx={{ mb: 1 }}>
              {item.date}: <strong>{item.repo}</strong> ({item.status})
            </Typography>
          ))}
        </CardContent>
      </Card>

      {/* Tech Stack */}
      {extensionsData.length > 0 && (
        <Card sx={{ ...cardStyle, border: "1px solid #334155", mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              🧩 Tech Stack
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {extensionsData.map((ext, i) => (
                <Chip
                  key={ext.name}
                  label={`${ext.name} (${ext.value})`}
                  sx={{
                    bgcolor: "#1e293b",
                    color: COLORS[i % COLORS.length],
                    fontWeight: 500,
                    px: 2,
                    py: 0.5,
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ height: 260, mt: 4 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={extensionsData} dataKey="value" nameKey="name" outerRadius={90}>
                    {extensionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: 8 }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* AI REPORT */}
      {data.aiReport && (
        <Card sx={{ ...cardStyle, border: "1px solid #334155", mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              🧠 AI Insights
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ maxHeight: "400px", overflowY: "auto", pr: 1 }}>
              <ReactMarkdown>{data.aiReport}</ReactMarkdown>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ ...cardStyle, transition: "0.3s" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ fontSize: 36, color: "#3b82f6" }}>{icon}</Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {value}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {label}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

const pageStyle = {
  minHeight: "100vh",
  bgcolor: "#0f172a",
  color: "#e5e7eb",
  p: 4,
  fontFamily: "Inter, sans-serif",
};
const cardStyle = {
  bgcolor: "#020617",
  color: "#e5e7eb",
  borderRadius: 3,
  mb: 4,
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
};
