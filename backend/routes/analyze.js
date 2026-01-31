const express = require("express");
const repoQueue = require("../queue/repoQueue");
const redis = require("../redis");

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { repoUrl } = req.body;
  if (!repoUrl) return res.status(400).json({ error: "repoUrl required" });

  const job = await repoQueue.add({ repoUrl });

  await redis.set(
    `analysis:${job.id}`,
    JSON.stringify({ status: "queued", progress: 0 })
  );

  res.json({ jobId: job.id });
});

router.get("/status/:jobId", async (req, res) => {
  const data = await redis.get(`analysis:${req.params.jobId}`);
  if (!data) return res.status(404).json({ error: "Job not found" });
  res.json(JSON.parse(data));
});

router.get("/result/:jobId", async (req, res) => {
  const data = await redis.get(`analysis:${req.params.jobId}`);
  if (!data) return res.status(404).json({ error: "Job not found" });

  const parsed = JSON.parse(data);
  if (parsed.status !== "completed") return res.status(400).json(parsed);

  res.json(parsed.result);
});

module.exports = router;
