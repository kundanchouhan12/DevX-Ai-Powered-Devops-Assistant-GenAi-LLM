import { useEffect, useState } from "react";
import axios from "axios";

export default function useJobStatus(jobId) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      const res = await axios.get(
        `http://localhost:5000/api/analyze/status/${jobId}`
      );
      setData(res.data);

      if (res.data.status === "completed") {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId]);

  return data;
}
