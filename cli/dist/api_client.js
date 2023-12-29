import axios from 'axios';
export class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async createTemplate(key, value) {
        try {
            await axios.post(`${this.baseURL}/templates`, { key, value });
            console.log(`Template ${key} created successfully.`);
        }
        catch (error) {
            console.error('Error creating template:', error.response?.data || error.message);
        }
    }
    async getTemplate(key) {
        try {
            const response = await axios.get(`${this.baseURL}/templates/${key}`);
            console.log(`Template ${key}:`, response.data);
            return response.data;
        }
        catch (error) {
            console.error('Error retrieving template:', error.response?.data || error.message);
        }
    }
    async deleteTemplate(key) {
        try {
            await axios.delete(`${this.baseURL}/templates/${key}`);
            console.log(`Template ${key} deleted successfully.`);
        }
        catch (error) {
            console.error('Error deleting template:', error.response?.data || error.message);
        }
    }
}
//# sourceMappingURL=api_client.js.map