const IORedis = require("ioredis");

if (!process.env.REDIS_URL) {
  throw new Error("❌ REDIS_URL missing");
}

const redis = new IORedis(process.env.REDIS_URL, {
  tls: {},                  // 🔥 REQUIRED for Upstash
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("✅ Backend Redis connected (Upstash)");
});

redis.on("error", (err) => {
  console.error("❌ Backend Redis error:", err.message);
});

module.exports = redis;
