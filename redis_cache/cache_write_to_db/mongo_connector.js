const mongoose = require("mongoose");
require("dotenv/config");

console.log(process.env.MAIN_DB_URI);

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
});

const TemplateModel = mongoose.model('Template', templateSchema);

// Connect to MongoDB
mongoose.connect(process.env.MAIN_DB_URI || "mongodb+srv://rado:rado@task-manager.8d8g6sk.mongodb.net/?retryWrites=true&w=majority")
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

    async getAllTemplates() {
        try {
            const templates = await TemplateModel.find();
            return templates;
        }
        catch (error) {
            throw new Error(`Error getting all templates: ${error.message}`);
        }
    }
}

module.exports = { DBRepo };