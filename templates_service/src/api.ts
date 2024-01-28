import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Saver } from './saver'; 
import { data_interacter } from './data_client';
type unvalid = null | undefined
function check_value<unvalid>(input: any,value: unvalid){
    if(input === value) {
        return true;
    }
    return false
}
function validate_input(input: any){
    return ((check_value(input,undefined)) || check_value(input,null))
}
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
    if(validate_input(key) || validate_input(value)){
        return res.status(500).json("must specify both key and value")
    }
    const result = await data_interacter.create_template(key,value) 
   if(result){
    return res.status(200).json("succesfully created")
   }
   return res.status(500).json("smthing bad happend")
});

app.get('/templates/:key',async (req: Request, res: Response) => {
    const template_name = req.params.key;
    // if (template) {
    //     res.json({ [req.params.key]: template });
    // } else {
    //     res.status(404).json({ error: `Template with key ${req.params.key} not found.` });
    //}
    if(validate_input(template_name)){
        return res.status(500).json("specify template name")
    }
    const template = await data_interacter.get_template(template_name);
    if(validate_input(template)){
        return res.status(404).json("not found template")
    }
    return res.status(200).json({template:template})
});

app.delete('/templates/:key', (req: Request, res: Response) => {
    saver.delete(req.params.key);
    res.json({ message: `Template ${req.params.key} deleted successfully.` });
});
app.get('templates/get_all', (req:Request, res:Response) => {
    const templates = data_interacter.get_all_templates()
    if (validate_input(templates)) {
        return res.status(500)
    }
    return res.status(200).json(templates)

})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
