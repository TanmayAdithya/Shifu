import { createClient, RedisClientType } from "redis";

let redis: RedisClientType;

const initRedis = async () => {
  if (!redis || !redis.isOpen) {
    redis = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST_URL,
        port: 15803,
      },
    });

    redis.on("error", (err) => console.error("Redis client error: ", err));

    await redis.connect();
    console.log("Redis connected");
  } else {
    console.log("Using existing Redis connection");
  }
};

await initRedis();

process.on("SIGINT", async () => {
  try {
    if (redis) {
      await redis.disconnect();
    }
  } catch (error) {
    console.error("Failed to close Redis connection:", error);
  }
  process.exit(0);
});

export { redis };
