const { createClient } = require('redis');
const { RedisConnector } = require('./redis_connector');
async function fetchDataFromRedis() {
  const redisConnector = new RedisConnector();

  try {
    await redisConnector.connect();

    const allKeys = await redisConnector.getAllKeys();

    for (const key of allKeys) {
      const value = await redisConnector.get(key);
      console.log(`Key: ${key}, Value: ${value}`);
    }

    redisConnector.clearDatabase()
  } finally {
    await redisConnector.disconnect();
  }
}

fetchDataFromRedis()
setInterval(fetchDataFromRedis, 3600000);
