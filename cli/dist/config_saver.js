import * as fs from 'fs';
function checkValue(value, invalidValue) {
    return value === invalidValue;
}
function validateInput(input) {
    return checkValue(input, undefined) || checkValue(input, null);
}
class FileManager {
    constructor(filePath) {
        this._filePath = filePath;
    }
    getJson() {
        const default_url = "http://localhost:3000";
        try {
            const fileContent = fs.readFileSync(this._filePath, 'utf-8');
            const config = JSON.parse(fileContent);
            return config;
        }
        catch (error) {
            this.writeJson({
                url: default_url,
                additional_config: {},
            });
            return undefined;
        }
    }
    writeJson(data) {
        const jsonData = JSON.stringify(data, null, 2);
        if (!fs.existsSync(this._filePath)) {
            fs.writeFileSync(this._filePath, jsonData, 'utf-8');
        }
        else {
            fs.writeFileSync(this._filePath, jsonData, 'utf-8');
        }
    }
}
export class Config {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }
    get_url() {
        const config = this.fileManager.getJson();
        return config?.url;
    }
    set_url(newUrl) {
        if (validateInput(newUrl)) {
            console.log("url must be != undefined");
            return;
        }
        const existingConfig = this.fileManager.getJson();
        this.fileManager.writeJson({
            url: newUrl,
            additional_config: existingConfig?.additional_config || {},
        });
    }
}
export const config = new Config(new FileManager("./config.json"));
//# sourceMappingURL=config_saver.js.map