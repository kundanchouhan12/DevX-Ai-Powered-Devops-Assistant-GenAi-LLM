const redis = require("../utils/redisConnection");
const scanRepo = require("../utils/scanRepo");
const geminiAnalyze = require("../utils/geminiAnalyze");

module.exports = async (job) => {
  const { repoUrl } = job.data;
  const jobId = job.id;

  try {
    console.log("🚀 Processing job:", jobId);

    await redis.set(`analysis:${jobId}`, JSON.stringify({
      status: "scanning",
      progress: 30
    }));

    const scanResult = await scanRepo(repoUrl, jobId);

    await redis.set(
      `context:${jobId}`,
      JSON.stringify(scanResult)
    );

    await redis.set(`analysis:${jobId}`, JSON.stringify({
      status: "ai_analyzing",
      progress: 70
    }));

    const aiReport = await geminiAnalyze(scanResult);

    await redis.set(`analysis:${jobId}`, JSON.stringify({
      status: "completed",
      progress: 100,
      result: aiReport
    }));

    console.log("✅ Job completed:", jobId);

  } catch (err) {
    console.error("❌ Job failed:", err);

    await redis.set(`analysis:${jobId}`, JSON.stringify({
      status: "failed",
      error: err.message
    }));
  }
};
