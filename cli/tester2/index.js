import axios from 'axios';

const Endpoint = {
  GET: 'get',
  SET: 'set',
  DELETE: 'delete',
};

const StatusCode = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

class DB_repo {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async makeRequest(method, endpoint, data, params) {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}/${endpoint}`,
        data: method === 'POST' ? data : undefined,
        params: method !== 'POST' ? params : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === StatusCode.SUCCESS) {
        if (response.data && response.data.success) {
          return { success: true, value: response.data.value };
        } else {
          return { success: false, error: 'Request failed' };
        }
      } else if (response.status === StatusCode.BAD_REQUEST) {
        return { success: false, error: 'Bad request' };
      } else {
        return { success: false, error: 'Server error' };
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data.error || 'Unknown error' };
      } else {
        return { success: false, error: 'Network error' };
      }
    }
  }

  async get(key) {
    return this.makeRequest('GET', Endpoint.GET, undefined, { key });
  }

  async set(key, value) {
    return this.makeRequest('POST', Endpoint.SET, { key, value });
  }

  async delete(key) {
    return this.makeRequest('DELETE', Endpoint.DELETE, undefined, { key });
  }
}

// Usage example:
const baseURL = 'http://localhost:3000'; // Replace with your server URL
const db = new DB_repo(baseURL);

// Example usage of the DB_repo class
(async () => {
  const getResult = await db.get('pipi');
  console.log('Get Result:', getResult);

  const setResult = await db.set('pepe', 'npip');
  console.log('Set Result:', setResult);

  const deleteResult = await db.delete('pipi');
  console.log('Delete Result:', deleteResult);
})();
