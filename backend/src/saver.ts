import * as fs from 'fs';

export interface Template {
    [key: string]: string;
}

export class Saver {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.createFileIfNotExists();
    }

    private createFileIfNotExists(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '{}');
        }
    }

    private readFile(): Template {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return {};
        }
    }

    private writeFile(data: Template): void {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    create(key: string, value: string): void {
        const templates = this.readFile();
        templates[key] = value;
        this.writeFile(templates);
    }

    delete(key: string): void {
        const templates = this.readFile();
        if (templates[key]) {
            delete templates[key];
            this.writeFile(templates);
        } else {
            console.log(`Template with key "${key}" does not exist.`);
        }
    }

    get(key: string): string | undefined {
        const templates = this.readFile();
        return templates[key];
    }
}

// Example usage:
const saver = new Saver('templates.json');

saver.create('template1', 'This is template 1 content.');
saver.create('template2', 'This is template 2 content.');

console.log(saver.get('template1')); // Output: This is template 1 content.

saver.delete('template2');
console.log(saver.get('template2')); // Output: undefined
