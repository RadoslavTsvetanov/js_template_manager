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
exports.Saver = void 0;
const fs = __importStar(require("fs"));
class Saver {
    constructor(filePath) {
        this.filePath = filePath;
        this.createFileIfNotExists();
    }
    createFileIfNotExists() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '{}');
        }
    }
    readFile() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return {};
        }
    }
    writeFile(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }
    create(key, value) {
        const templates = this.readFile();
        templates[key] = value;
        this.writeFile(templates);
    }
    delete(key) {
        const templates = this.readFile();
        if (templates[key]) {
            delete templates[key];
            this.writeFile(templates);
        }
        else {
            console.log(`Template with key "${key}" does not exist.`);
        }
    }
    get(key) {
        const templates = this.readFile();
        return templates[key];
    }
}
exports.Saver = Saver;
// Example usage:
const saver = new Saver('templates.json');
saver.create('template1', 'This is template 1 content.');
saver.create('template2', 'This is template 2 content.');
console.log(saver.get('template1')); // Output: This is template 1 content.
saver.delete('template2');
console.log(saver.get('template2')); // Output: undefined
