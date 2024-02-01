"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data_interacter = exports.Data_interacter = void 0;
const redis_connector_1 = require("./redis_connector");
const main_db_client_1 = require("./main_db_client");
class Data_interacter {
    constructor(redis_connector, main_db_connector) {
        this.redis_connector = redis_connector;
        this.main_db_connector = main_db_connector;
    }
    async get_template(name) {
        const cachedTemplate = await this.redis_connector.get(name);
        if (cachedTemplate) {
            console.log('Template found in Redis cache.');
            return cachedTemplate;
        }
        const templateFromMainDB = await this.main_db_connector.getTemplate(name);
        if (templateFromMainDB) {
            console.log('Template found in the main database.');
            // await this.redis_connector.set(name, templateFromMainDB);
            return templateFromMainDB;
        }
        console.log('Template not found.');
        return undefined;
    }
    async create_template(name, content) {
        const res = await this.redis_connector.set(name, content);
        if (res == undefined || res == null) {
            return false;
        }
        return true;
    }
    async get_all_templates() {
        try {
            return await this.main_db_connector.getAllTemplates();
        }
        catch (err) {
            return undefined;
        }
    }
}
exports.Data_interacter = Data_interacter;
exports.data_interacter = new Data_interacter(new redis_connector_1.RedisConnector(), new main_db_client_1.DBRepo());
