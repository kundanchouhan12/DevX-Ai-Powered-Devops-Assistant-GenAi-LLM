const { Queue } = require("bullmq");
const connection = require("../redis");

const repoQueue = new Queue("repo-analysis", {
  connection,
});

repoQueue.on("error", (err) => {
  console.error("❌ Backend BullMQ error:", err.message);
});

module.exports = repoQueue;
