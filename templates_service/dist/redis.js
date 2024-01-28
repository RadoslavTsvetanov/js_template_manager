"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const mongoose_1 = __importStar(require("mongoose"));
class RedisClient {
    constructor() {
        mongoose_1.default.connect('mongodb+srv://KURO:KURO@task-manager.8d8g6sk.mongodb.net/${db_name}?retryWrites=true&w=majority');
        const templateSchema = new mongoose_1.Schema({
            key: { type: String, required: true },
            value: { type: String, required: true },
        });
        this.TemplateModel = mongoose_1.default.model('Template', templateSchema);
    }
    async set(key, value) {
        try {
            const existingTemplate = await this.TemplateModel.findOne({ key });
            if (existingTemplate) {
                return { success: false, value: existingTemplate };
            }
            const newTemplate = await this.TemplateModel.create({ key, value });
            return { success: true, value: newTemplate };
        }
        catch (error) {
            return { success: false, value: null };
        }
    }
    async get(key) {
        try {
            const template = await this.TemplateModel.findOne({ key });
            return { success: true, value: template };
        }
        catch (error) {
            return { success: false, value: null };
        }
    }
    async delete(key) {
        try {
            const template = await this.TemplateModel.findOneAndDelete({ key });
            return { success: true, value: template };
        }
        catch (error) {
            return { success: false, value: null };
        }
    }
}
exports.RedisClient = RedisClient;
// Test function to demonstrate usage
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
