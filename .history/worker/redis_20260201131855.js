const IORedis = require("ioredis");

if (!process.env.REDIS_URL) {
  throw new Error("❌ REDIS_URL missing");
}

const redis = new IORedis(process.env.REDIS_URL, {
  tls: {},
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("✅ Worker Redis connected (Upstash)");
});

redis.on("error", (err) => {
  console.error("❌ Worker Redis error:", err.message);
});

module.exports = redis;
