import { createClient } from "redis";

const redisUrl = "redis://redis:6379";

const redisClient = createClient({
  url: redisUrl,
  legacyMode: true,
});

redisClient.connect().catch(console.error);

export { redisClient };
