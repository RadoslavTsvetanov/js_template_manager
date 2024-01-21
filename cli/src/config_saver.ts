import * as fs from 'fs';

type Invalid = null | undefined;

function checkValue(value: any, invalidValue: Invalid): boolean {
    return value === invalidValue;
}

function validateInput(input: any): boolean {
    return checkValue(input, undefined) || checkValue(input, null);
}

type JSONData = {
    url: string;
    additional_config: object;
};

class FileManager {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public getJson(): JSONData | undefined {
        try {
            const fileContent = fs.readFileSync(this.filePath, 'utf-8');
            const config: JSONData = JSON.parse(fileContent);
            return config;
        } catch (error) {
            this.writeJson({
                url: '',
                additional_config: {},
            });
            return undefined;
        }
    }

    public writeJson(data: JSONData): void {
        const jsonData = JSON.stringify(data, null, 2);

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, jsonData, 'utf-8');
        } else {
            fs.writeFileSync(this.filePath, jsonData, 'utf-8');
        }
    }
}

export class Config {
    private fileManager: FileManager;

    constructor(fileManager: FileManager) {
        this.fileManager = fileManager;
    }

    public get_url(): string | undefined {
        const config = this.fileManager.getJson();
        return config?.url;
    }

    public set_url(newUrl: string) {
        if (validateInput(newUrl)) {
            return;
        }

        const existingConfig = this.fileManager.getJson();
        this.fileManager.writeJson({
            url: newUrl,
            additional_config: existingConfig?.additional_config || {},
        });
    }
}
