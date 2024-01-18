// import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// class DynamoDBHelper {
//   private readonly tableName: string;
//   private readonly dynamoDB: DocumentClient;

//   constructor(tableName: string, region: string) {
//     this.tableName = tableName;
//     this.dynamoDB = new DocumentClient({ region });
//   }

//   async createItem(item: any): Promise<void> {
//     const params: DocumentClient.PutItemInput = {
//       TableName: this.tableName,
//       Item: item,
//     };

//     try {
//       await this.dynamoDB.put(params).promise();
//       console.log('Item created successfully.');
//     } catch (error) {
//       console.error('Error creating item:', error);
//     }
//   }

//   async getItem(key: any): Promise<void> {
//     const params: DocumentClient.GetItemInput = {
//       TableName: this.tableName,
//       Key: key,
//     };

//     try {
//       const data = await this.dynamoDB.get(params).promise();
//       if (data.Item) {
//         console.log('Retrieved Item:', data.Item);
//       } else {
//         console.log('Item not found.');
//       }
//     } catch (error) {
//       console.error('Error getting item:', error);
//     }
//   }

//   async updateItem(key: any, updateExpression: string, expressionAttributeValues: any): Promise<void> {
//     const params: DocumentClient.UpdateItemInput = {
//       TableName: this.tableName,
//       Key: key,
//       UpdateExpression: updateExpression,
//       ExpressionAttributeValues: expressionAttributeValues,
//     };

//     try {
//       await this.dynamoDB.update(params).promise();
//       console.log('Item updated successfully.');
//     } catch (error) {
//       console.error('Error updating item:', error);
//     }
//   }

//   async deleteItem(key: any): Promise<void> {
//     const params: DocumentClient.DeleteItemInput = {
//       TableName: this.tableName,
//       Key: key,
//     };

//     try {
//       await this.dynamoDB.delete(params).promise();
//       console.log('Item deleted successfully.');
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   }
// }

// export default DynamoDBHelper;
