class RedisConnector {
    constructor() {
      this.client = createClient({
        host: process.env.HOST,
        port: process.env.PORT
      });
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
module.exports = {
    RedisConnector
}  