import axios, { AxiosResponse } from 'axios';

export class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async createTemplate(key: string, value: string): Promise<void> {
        try {
            await axios.post(`${this.baseURL}/templates`, { key, value });
            console.log(`Template ${key} created successfully.`);
        } catch (error) {
            console.error('Error creating template:', error);
        }
    }

    async getTemplate(key: string): Promise<void> {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseURL}/templates/${key}`);
            console.log(`Template ${key}:`, response.data);
            const template = JSON.parse(response.data.template)
            return template
        } catch (error) {
            console.error('Error retrieving template:', error.response?.data || error.message);
        }
    }

    async deleteTemplate(key: string): Promise<void> {
        try {
            await axios.delete(`${this.baseURL}/templates/${key}`);
            console.log(`Template ${key} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting template:', error.response?.data || error.message);
        }
    }
}