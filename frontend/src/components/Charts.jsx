import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Charts({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ["JS", "TS", "Python", "Java", "Other"],
    datasets: [
      {
        label: "Language Usage",
        data: [
          data.languages?.js || 0,
          data.languages?.ts || 0,
          data.languages?.python || 0,
          data.languages?.java || 0,
          data.languages?.other || 0,
        ],
        backgroundColor: "#4f46e5",
      },
    ],
  };

  return (
    <div className="card">
      <h3>📊 Code Language Breakdown</h3>
      <Bar data={chartData} />
    </div>
  );
}
