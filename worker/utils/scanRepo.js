const fs = require("fs");
const path = require("path");

function scanDir(dir, stats) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      stats.folders.push(item.name);
      scanDir(fullPath, stats);
    } else {
      stats.files++;
      const ext = path.extname(item.name);
      stats.extensions[ext] = (stats.extensions[ext] || 0) + 1;

      try {
        const lines = fs.readFileSync(fullPath, "utf8").split("\n").length;
        stats.lines += lines;
      } catch {}
    }
  }
}

module.exports = function scanRepo(repoPath) {
  const stats = {
    files: 0,
    lines: 0,
    folders: [],
    extensions: {},
  };

  scanDir(repoPath, stats);
  return stats;
};
