import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Saver } from './saver'; // Import your Saver class implementation

const app = express();
app.use(bodyParser.json());

const saver = new Saver('templates.json');

app.post('/templates', (req: Request, res: Response) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).json({ error: 'Both key and value are required.' });
    }
    saver.create(key, value);
    res.status(201).json({ message: `Template ${key} created successfully.` });
});

app.get('/templates/:key', (req: Request, res: Response) => {
    const template = saver.get(req.params.key);
    if (template) {
        res.json({ [req.params.key]: template });
    } else {
        res.status(404).json({ error: `Template with key ${req.params.key} not found.` });
    }
});

app.delete('/templates/:key', (req: Request, res: Response) => {
    saver.delete(req.params.key);
    res.json({ message: `Template ${req.params.key} deleted successfully.` });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
