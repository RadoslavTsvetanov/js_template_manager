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
exports.DBRepo = void 0;
const mongoose_1 = __importStar(require("mongoose"));
require("dotenv/config");
const templateSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
});
const TemplateModel = mongoose_1.default.model('Template', templateSchema);
// Connect to MongoDB
mongoose_1.default.connect(process.env.MAIN_DB_URI || "") // bad practice but need to keep the ts compiler happy
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
class DBRepo {
    async createTemplate(templateData) {
        try {
            const createdTemplate = await TemplateModel.create(templateData);
            return createdTemplate;
        }
        catch (error) {
            throw new Error(`Error creating template: ${error.message}`);
        }
    }
    async deleteTemplate(templateId) {
        try {
            await TemplateModel.findByIdAndDelete(templateId);
        }
        catch (error) {
            throw new Error(`Error deleting template: ${error.message}`);
        }
    }
    async getTemplate(templateName) {
        try {
            const template = await TemplateModel.findOne({ name: templateName });
            return JSON.stringify(template);
        }
        catch (error) {
            throw new Error(`Error getting template: ${error.message}`);
        }
    }
}
exports.DBRepo = DBRepo;
