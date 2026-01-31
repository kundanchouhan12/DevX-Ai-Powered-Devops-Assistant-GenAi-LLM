const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Get a valid model that supports generateContent
 */
async function getAvailableModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not set");
  }

  try {
    const { data } = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const models = data.models.filter(
      (m) =>
        m.supportedGenerationMethods &&
        m.supportedGenerationMethods.includes("generateContent")
    );

    if (models.length === 0) {
      throw new Error("No models supporting generateContent available for your API key");
    }

    // Pick first stable model
    return models[0].name;
  } catch (err) {
    throw new Error(`[GoogleGenerativeAI Error]: ${err.message}`);
  }
}

/**
 * Chunk large JSON data to avoid API size limits
 */
function chunkRepoStats(repoStats, chunkSize = 5000) {
  const statsStr = JSON.stringify(repoStats, null, 2);
  const chunks = [];
  let start = 0;

  while (start < statsStr.length) {
    chunks.push(statsStr.slice(start, start + chunkSize));
    start += chunkSize;
  }

  return chunks;
}

async function geminiAnalyze(repoStats) {
  const modelName = await getAvailableModel();
  const model = genAI.getGenerativeModel({ model: modelName });

  const chunks = chunkRepoStats(repoStats);

  let finalResponse = "";

  for (let i = 0; i < chunks.length; i++) {
    const prompt = `
You are a senior DevOps engineer and software architect.

Analyze the following chunk of GitHub repository stats.

Chunk ${i + 1} of ${chunks.length}:
====================
${chunks[i]}
====================

TASKS:
1. Summarize repository structure (folders, major components)
2. Identify tech stack (languages, frameworks, tools)
3. Suggest performance optimizations & code quality improvements
4. Highlight possible bugs, security risks, architectural issues
5. DevOps, Docker, and CI/CD suggestions
6. Maintainability, scalability, readability concerns
7. Overall improvements & best practices

OUTPUT FORMAT:
Return in clean Markdown with sections:
- 📦 Repository Overview
- 🧰 Tech Stack
- ⚡ Optimizations & Code Quality
- 🐞 Issues & Risks
- 🚀 DevOps / Docker / CI-CD Suggestions
- 🧹 Maintainability & Improvements
- ✅ Final Verdict
`;

    const result = await model.generateContent(prompt);
    finalResponse += result.response.text() + "\n\n---\n\n";
  }

  return finalResponse;
}

module.exports = geminiAnalyze;