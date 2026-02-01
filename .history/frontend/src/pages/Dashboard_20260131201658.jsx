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
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#ef4444", "#8b5cf6", "#ec4899"];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const jobId = localStorage.getItem("jobId");

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await api.get(`/analyze/result/${jobId}`);
        setData(res.data);
      } catch (err) {
        console.error("Result fetch failed", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [jobId]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">⏳ Analyzing repository...</div>;
  }

  if (!data) {
    return <div className="text-center text-red-500">No data found</div>;
  }

  const extensionChart = Object.entries(data.extensions).map(([key, value]) => ({
    name: key || "no-ext",
    value,
  }));

  const barData = extensionChart.slice(0, 6);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">📊 Repository Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Files" value={data.files} />
        <StatCard title="Total Lines" value={data.lines} />
        <StatCard title="Folders" value={data.folders.length} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="File Extensions Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={extensionChart} dataKey="value" nameKey="name" outerRadius={100}>
                {extensionChart.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Extensions">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* FOLDERS */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-3">📁 Project Folders</h2>
        <div className="max-h-52 overflow-y-auto text-sm space-y-1">
          {data.folders.map((f, i) => (
            <div key={i} className="border-b py-1">{f}</div>
          ))}
        </div>
      </div>

      {/* AI REPORT */}
      <div className="bg-gray-900 text-gray-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">🤖 AI Code Review</h2>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
          {data.aiReport}
        </pre>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-5 text-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
