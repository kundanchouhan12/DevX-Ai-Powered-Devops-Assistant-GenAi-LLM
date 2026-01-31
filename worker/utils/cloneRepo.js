const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = async function cloneRepo(repoUrl, jobId) {
  const baseDir = "/tmp/repos";
  const repoPath = path.join(baseDir, String(jobId));

  /* 🔥 ensure base dir */
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  /* 🔥 IMPORTANT FIX: delete old folder if exists */
  if (fs.existsSync(repoPath)) {
    console.log("🧹 Removing existing repo folder:", repoPath);
    fs.rmSync(repoPath, { recursive: true, force: true });
  }

  console.log("📥 Cloning repo:", repoUrl);

  execSync(
    `git clone --depth=1 ${repoUrl} ${repoPath}`,
    { stdio: "inherit" }
  );

  return repoPath;
};
