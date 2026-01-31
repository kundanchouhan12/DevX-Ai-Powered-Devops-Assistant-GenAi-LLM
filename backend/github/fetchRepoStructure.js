const axios = require("axios");

const GITHUB_API = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Extract owner & repo from GitHub URL
 */
function parseRepoUrl(repoUrl) {
  const match = repoUrl.match(/github\.com\/(.+?)\/(.+?)(\.git)?$/);
  if (!match) throw new Error("Invalid GitHub repo URL");

  return {
    owner: match[1],
    repo: match[2],
  };
}

/**
 * Fetch important repo files only (LLM friendly)
 */
module.exports = async function fetchRepoStructure(repoUrl) {
  const { owner, repo } = parseRepoUrl(repoUrl);

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

  let output = `Repository: ${owner}/${repo}\n\n`;

  try {
    // 1️⃣ Fetch root directory
    const treeRes = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/contents`,
      { headers }
    );

    const files = treeRes.data;

    const importantFiles = [
      "README.md",
      "Dockerfile",
      "package.json",
      "docker-compose.yml",
      ".github/workflows",
    ];

    for (const file of files) {
      if (importantFiles.includes(file.name)) {
        if (file.type === "file") {
          const fileRes = await axios.get(file.download_url);
          output += `\n==== ${file.name} ====\n`;
          output += fileRes.data.slice(0, 4000); // LIMIT content
        }

        if (file.type === "dir" && file.name === ".github") {
          const workflows = await axios.get(file.url, { headers });

          for (const wf of workflows.data) {
            if (wf.name.endsWith(".yml") || wf.name.endsWith(".yaml")) {
              const wfRes = await axios.get(wf.download_url);
              output += `\n==== .github/workflows/${wf.name} ====\n`;
              output += wfRes.data.slice(0, 3000);
            }
          }
        }
      }
    }

    // 2️⃣ Add folder structure summary
    output += `\n\nFolder Structure:\n`;
    files.forEach((f) => {
      output += `- ${f.type}: ${f.name}\n`;
    });

    return output;
  } catch (err) {
    console.error("GitHub fetch failed:", err.message);
    throw new Error("Unable to fetch GitHub repo data");
  }
};
