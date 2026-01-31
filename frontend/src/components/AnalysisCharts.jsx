import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function AnalysisCharts({ stats }) {
  if (!stats) return null;

  const data = Object.entries(stats.languages || {}).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div className="card">
      <h3>📊 Language Usage</h3>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}
