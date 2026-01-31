const repoQueue = require("./queue/repoQueue");
const repoProcessor = require("./processors/repoProcessor");

console.log("👷 Worker started, waiting for jobs...");

repoQueue.process(async (job) => {
  return repoProcessor(job);
});
