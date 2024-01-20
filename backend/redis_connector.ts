// code duplication from cache interacter since everything will be dployed in its own docker container 
import {createClient} from "redis"

export class RedisConnector {
    client: any;
    constructor() {
      this.client = createClient({url:process.env.REDIS_URI});
      this.client.on('error', (err : any)  => console.log('Redis Client Error', err));
    }
  
    async connect() {
      await this.client.connect();
    }
  
    async set(key: string, value: string) {
      const result = await this.client.set(key, value);
      return result;
    }
  
    async get(key: string) {
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
