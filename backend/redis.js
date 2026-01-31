const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: process.env.REDIS_PORT || 6379,
});

redis.on("connect", () =>
  console.log("✅ Backend Redis connected")
);

redis.on("error", (err) =>
  console.error("❌ Backend Redis error:", err.message)
);

module.exports = redis;
