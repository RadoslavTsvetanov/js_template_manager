import { RedisConnector } from "./redis_connector";
import {DBRepo} from "./main_db_client"
export class Data_interacter {
  private redis_connector: RedisConnector;
  private main_db_connector: DBRepo; 

  constructor(redis_connector: RedisConnector, main_db_connector: any) {
    this.redis_connector = redis_connector;
    this.main_db_connector = main_db_connector;
  }

  async get_template(name: string): Promise<string | undefined> {
    const cachedTemplate = await this.redis_connector.get(name);
    if (cachedTemplate) {
      console.log('Template found in Redis cache.');
      return cachedTemplate;
    }
    const templateFromMainDB = await this.main_db_connector.getTemplate(name);
    if (templateFromMainDB) {
      console.log('Template found in the main database.');
      await this.redis_connector.set(name, templateFromMainDB);
      return templateFromMainDB;
    }

    console.log('Template not found.');
    return undefined;
  }

  async create_template(name: string, content: string): Promise<boolean> {
    const res = await this.redis_connector.set(name, content);
    if(res == undefined || res == null){
        return false
    }
    return true;
  }

  async get_all_templates() {
    try {
      return await this.main_db_connector.getAllTemplates()
    }catch(err){
      return undefined
    }
  }
}


export const data_interacter = new Data_interacter(new RedisConnector(),new DBRepo())