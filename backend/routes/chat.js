router.post("/ask", async (req, res) => {
  const { jobId, question } = req.body;

  const data = await redis.get(`analysis:${jobId}`);
  if (!data) return res.status(404).json({ error: "Job not found" });

  const context = JSON.parse(data).report;

  const answer = await askGemini(`
Repo Analysis:
${context}

User Question:
${question}
`);

  res.json({ answer });
});
