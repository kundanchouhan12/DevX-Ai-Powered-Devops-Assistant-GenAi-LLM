const Queue = require("bull");

const repoQueue = new Queue("repo-analysis", {
  redis: {
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT || 6379,
  },
});

repoQueue.on("error", (err) =>
  console.error("❌ Backend Bull error:", err.message)
);

module.exports = repoQueue;
