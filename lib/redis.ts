import { createClient } from "redis";

const redis = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST_URL,
    port: 15803,
  },
});

redis.on("error", (err) => console.log("Redis client error: ", err));

if (!redis.isOpen) {
  redis.connect();
}

export { redis };
