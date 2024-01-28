"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
class RedisClient {
    constructor() {
        this.client = net_1.default.createConnection({ port: 6379, host: '127.0.0.1' }, () => {
            console.log('Connected to Redis server');
        });
        this.client.on('end', () => {
            console.log('Disconnected from Redis server');
        });
    }
    sendCommand(command) {
        const commandString = `*${command.length}\r\n${command
            .map(arg => `$${Buffer.byteLength(arg)}\r\n${arg}`)
            .join('\r\n')}\r\n`;
        this.client.write(commandString);
    }
    async sendCommandWithCallback(command) {
        return new Promise((resolve) => {
            this.sendCommand(command);
            this.client.on('data', (data) => {
                const response = data.toString();
                resolve(this.parseResponse(response));
            });
        });
    }
    parseResponse(response) {
        const [type, content] = response.split('\r\n').filter(Boolean);
        switch (type.charAt(0)) {
            case '+': // Single line reply
                return { success: true, value: content };
            case '*': // Array reply
                const count = parseInt(type.slice(1), 10);
                if (count === -1)
                    return { success: true, value: null };
                const values = content.split('\r\n').filter(Boolean);
                return { success: true, value: values };
            case '$': // Bulk string reply
                const length = parseInt(type.slice(1), 10);
                if (length === -1)
                    return { success: true, value: null };
                return { success: true, value: content.slice(0, length) };
            case '-': // Error reply
                return { success: false, value: null, error: content };
            default:
                return { success: false, value: "Unexpected server response" };
        }
    }
    async set(key, value) {
        return this.sendCommandWithCallback(['SET', key, value]);
    }
    async get(key) {
        return this.sendCommandWithCallback(['GET', key]);
    }
    async delete(key) {
        return this.sendCommandWithCallback(['DEL', key]);
    }
}
async function testRedisClient() {
    const redis = new RedisClient();
    const setResult = await redis.set('myKey', 'myValue');
    console.log('Set result:', setResult);
    const getValue = await redis.get('myKey');
    console.log('Value for myKey:', getValue);
    const deleteResult = await redis.delete('myKey');
    console.log('Delete result:', deleteResult);
}
testRedisClient();
