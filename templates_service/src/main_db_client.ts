import mongoose, { Document, Model, Schema } from 'mongoose';
import 'dotenv/config'
console.log(process.env.MAIN_DB_URI)
interface ITemplate {
  name: string;
  content: string;
}

interface ITemplateDocument extends ITemplate, Document {}

const templateSchema = new Schema<ITemplateDocument>({
  name: { type: String, required: true },
  content: { type: String, required: true },
});

const TemplateModel: Model<ITemplateDocument> = mongoose.model('Template', templateSchema);

// Connect to MongoDB
mongoose.connect(process.env.MAIN_DB_URI || "mongodb+srv://rado:rado@task-manager.8d8g6sk.mongodb.net/?retryWrites=true&w=majority") // bad practice but need to keep the ts compiler happy
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

export class DBRepo {
  async createTemplate(templateData: ITemplate): Promise<ITemplateDocument> {
    try {
      const createdTemplate = await TemplateModel.create(templateData);
      return createdTemplate;
    } catch (error: any) {
      throw new Error(`Error creating template: ${error.message}`);
    }
  }

  async deleteTemplate(templateId: string): Promise<void> {
    try {
      await TemplateModel.findByIdAndDelete(templateId);
    } catch (error: any) {
      throw new Error(`Error deleting template: ${error.message}`);
    }
  }

  async getTemplate(templateName: string): Promise<string | null> {
    try {
      const template = await TemplateModel.findOne({name:templateName});
      return JSON.stringify(template);
    } catch (error: any) {
      throw new Error(`Error getting template: ${error.message}`);
    }
  }

  async getAllTemplates(){
    try {
      const templates = await TemplateModel.find();
      return templates;
    } catch (error: any) {
      throw new Error(`Error getting all templates: ${error.message}`)
    }
  }
}
