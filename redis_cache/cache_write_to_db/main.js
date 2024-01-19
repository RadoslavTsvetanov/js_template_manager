const { createClient } = require('redis');

class RedisConnector {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  async connect() {
    await this.client.connect();
  }

  async set(key, value) {
    await this.client.set(key, value);
  }

  async get(key) {
    return await this.client.get(key);
  }

  async getAllKeys() {
    return await this.client.keys('*');
  }

  async disconnect() {
    await this.client.quit();
  }

  async clearDatabase() {
    await this.client.flushDb()
    console.log('Redis database cleared.');
  }
}

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
