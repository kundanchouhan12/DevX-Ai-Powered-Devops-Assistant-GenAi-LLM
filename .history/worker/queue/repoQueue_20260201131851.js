const { Worker } = require("bullmq");
const connection = require("../redis");

const worker = new Worker(
  "repo-analysis",
  async (job) => {
    console.log("🚀 Processing job:", job.id);
    // your logic here
  },
  { connection }
);

worker.on("failed", (job, err) => {
  console.error("❌ Job failed:", job.id, err.message);
});
