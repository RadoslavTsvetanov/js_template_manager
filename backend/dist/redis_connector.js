"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConnector = void 0;
// code duplication from cache interacter since everything will be dployed in its own docker container 
const redis_1 = require("redis");
require("dotenv/config");
class RedisConnector {
    constructor() {
        this.client = (0, redis_1.createClient)({ url: process.env.REDIS_URI });
        this.connect();
        this.client.on('error', (err) => console.log('Redis Client Error', err));
    }
    async connect() {
        await this.client.connect();
    }
    async set(key, value) {
        const result = await this.client.set(key, value);
        return result;
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
        await this.client.flushDb();
        console.log('Redis database cleared.');
    }
}
exports.RedisConnector = RedisConnector;
