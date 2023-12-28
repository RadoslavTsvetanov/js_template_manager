
import express, { Request, Response } from 'express';
import { RedisClient, OperationResult } from './redis';

const app = express();
const redis = new RedisClient();
// TODO fix nil value from redis giving succes:true
app.use(express.json());

app.get('/get/:key', async (req: Request, res: Response) => {
  const key = req.params.key;
  const result: OperationResult = await redis.get(key);

  if (result.success) {
    res.status(200).json({ success: true, value: result.value });
  } else {
    res.status(500).json({ success: false, error: result.error || 'Unknown error' });
  }
});

app.post('/set', async (req: Request, res: Response) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ success: false, error: 'Both key and value are required' });
  }

  const setResult: OperationResult = await redis.set(key, value);

  if (setResult.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false, error: setResult.error || 'Unknown error' });
  }
});

app.delete('/delete/:key', async (req: Request, res: Response) => {
  const key = req.params.key;
  const deleteResult: OperationResult = await redis.delete(key);

  if (deleteResult.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false, error: deleteResult.error || 'Unknown error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
