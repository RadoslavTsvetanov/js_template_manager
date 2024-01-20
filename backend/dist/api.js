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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const saver_1 = require("./saver");
const data_client_1 = require("./data_client");
function check_value(input, value) {
    if (input == value) {
        return true;
    }
    return false;
}
function validate_input(input) {
    return ((check_value(input, undefined)) || check_value(input, null));
}
const app = (0, express_1.default)();
app.use(bodyParser.json({ limit: '10mb' })); // increase the string size limit 
const saver = new saver_1.Saver('templates.json');
app.post('/templates', async (req, res) => {
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
    if (validate_input(key) || validate_input(value)) {
        return res.status(500).json("must specify both key and value");
    }
    const result = await data_client_1.data_interacter.create_template(key, value);
    if (result) {
        return res.status(200).json("succesfully created");
    }
    return res.status(500).json("smthing bad happend");
});
app.get('/templates/:key', async (req, res) => {
    const template_name = req.params.key;
    // if (template) {
    //     res.json({ [req.params.key]: template });
    // } else {
    //     res.status(404).json({ error: `Template with key ${req.params.key} not found.` });
    //}
    if (validate_input(template_name)) {
        return res.status(500).json("specify template name");
    }
    const template = await data_client_1.data_interacter.get_template(template_name);
    if (validate_input(template)) {
        return res.status(404).json("not found template");
    }
    return res.status(200).json({ template: template });
});
app.delete('/templates/:key', (req, res) => {
    saver.delete(req.params.key);
    res.json({ message: `Template ${req.params.key} deleted successfully.` });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
