"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("./redis");
const app = (0, express_1.default)();
const redis = new redis_1.RedisClient();
app.use(express_1.default.json());
app.get('/get/:key', async (req, res) => {
    const key = req.params.key;
    const result = await redis.get(key);
    if (result.success) {
        res.status(200).json({ success: true, value: result.value });
    }
    else {
        res.status(500).json({ success: false, error: result.error || 'Unknown error' });
    }
});
app.post('/set', async (req, res) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).json({ success: false, error: 'Both key and value are required' });
    }
    const setResult = await redis.set(key, value);
    if (setResult.success) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(500).json({ success: false, error: setResult.error || 'Unknown error' });
    }
});
app.delete('/delete/:key', async (req, res) => {
    const key = req.params.key;
    const deleteResult = await redis.delete(key);
    if (deleteResult.success) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(500).json({ success: false, error: deleteResult.error || 'Unknown error' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
