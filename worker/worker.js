// require("dotenv").config();

// const redis = require("./redis");
// const repoQueue = require("./queue/repoQueue");
// const cloneRepo = require("./utils/cloneRepo");
// const scanRepo = require("./utils/scanRepo");
// const geminiAnalyze = require("./utils/geminiAnalyze");

// console.log(
//   "🔑 GEMINI_API_KEY:",
//   process.env.GEMINI_API_KEY ? "FOUND" : "NOT FOUND"
// );

// console.log("⚡ Gemini AI Worker running...");

// repoQueue.process(async (job) => {
//   const { repoUrl } = job.data;
//   const jobId = job.id.toString();

//   try {
//     await redis.set(
//       `analysis:${jobId}`,
//       JSON.stringify({ status: "processing", progress: 10 })
//     );

//     const repoPath = await cloneRepo(repoUrl, jobId);

//     await redis.set(
//       `analysis:${jobId}`,
//       JSON.stringify({ status: "processing", progress: 50 })
//     );

//     const stats = scanRepo(repoPath);

//     await redis.set(
//       `analysis:${jobId}`,
//       JSON.stringify({ status: "processing", progress: 75 })
//     );

//     const aiReport = await geminiAnalyze(stats);

//     await redis.set(
//       `analysis:${jobId}`,
//       JSON.stringify({
//         status: "completed",
//         progress: 100,
//         result: { ...stats, aiReport },
//       })
//     );

//     return true;
//   } catch (err) {
//     await redis.set(
//       `analysis:${jobId}`,
//       JSON.stringify({
//         status: "failed",
//         error: err.message,
//       })
//     );
//     throw err;
//   }
// });

require("dotenv").config();

const redis = require("./redis");
const repoQueue = require("./queue/repoQueue");

const cloneRepo = require("./utils/cloneRepo");
const scanRepo = require("./utils/scanRepo");
const geminiAnalyze = require("./utils/geminiAnalyze");

console.log("⚡ Gemini AI Worker running...");
console.log(
  "🔑 GEMINI_API_KEY:",
  process.env.GEMINI_API_KEY ? "FOUND" : "NOT FOUND"
);

repoQueue.process(async (job) => {
  const { repoUrl } = job.data;
  const jobId = job.id;

  try {
    await redis.set(`analysis:${jobId}`, JSON.stringify({
      status: "processing",
      progress: 10,
    }));

    const repoPath = await cloneRepo(repoUrl, jobId);

    const stats = scanRepo(repoPath);

    const aiReport = await geminiAnalyze(stats);

    await redis.set(`analysis:${jobId}`, JSON.stringify({
      status: "completed",
      progress: 100,
      result: { ...stats, aiReport },
    }));

    return true;
  } catch (err) {
    await redis.set(`analysis:${jobId}`, JSON.stringify({
      status: "failed",
      error: err.message,
    }));
    throw err;
  }
});
