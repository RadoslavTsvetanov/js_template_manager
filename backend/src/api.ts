import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Saver } from './saver'; // Import your Saver class implementation
import { data_interacter } from './data_client';
const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // increase the string size limit 
const saver = new Saver('templates.json');
app.post('/templates',async (req: Request, res: Response) => {
    const { key, value } = req.body;
    // if (!(saver.get(key) === undefined)) {
    //     res.status(400).json({ error: `template with name ${key} already exists` })
    //     return; //! important to end the post req execution
    // }
    // if (!key || !value) {
    //     return res.status(400).json({ error: 'Both key and value are required.' });
    // }
    // saver.create(key, value);
    // res.status(201).json({ message: `Template ${key} created successfully.` });
   const result = await data_interacter.create_template(key,value) 
   if(result){
    return res.status(200).json("succesfully created")
   }
   return res.status(500).json("smthing bad happend")
});

app.get('/templates/:key',async (req: Request, res: Response) => {
    const template_name = saver.get(req.params.key);
    // if (template) {
    //     res.json({ [req.params.key]: template });
    // } else {
    //     res.status(404).json({ error: `Template with key ${req.params.key} not found.` });
    //}
    if(template_name == undefined){
        return res.status(500).json("specify template name")
    }
    const template = await data_interacter.get_template(template_name);
    return res.status(200).json("created succesfully")
});

app.delete('/templates/:key', (req: Request, res: Response) => {
    saver.delete(req.params.key);
    res.json({ message: `Template ${req.params.key} deleted successfully.` });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
