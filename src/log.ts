import axios from 'axios';

export class TrainkoreLog {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // Get logs by project ID, using the JWT token for authentication
  async getLogsByProjectId(projId: string, token: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/logs/${projId}`, {
        headers: { Authorization: `Bearer ${token}` },  // Use JWT token for authentication
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error response from server:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        throw new Error(
          `Failed to fetch logs: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('Failed to fetch logs: No response received from server');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error(`Failed to fetch logs: ${error.message}`);
      }
    }
  }

  // Get a log by log ID, using the JWT token for authentication
  async getLogByLogId(logId: string, token: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/log/${logId}`, {
        headers: { Authorization: `Bearer ${token}` },  // Use JWT token for authentication
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error response from server:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        throw new Error(
          `Failed to fetch log: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('Failed to fetch log: No response received from server');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error(`Failed to fetch log: ${error.message}`);
      }
    }
  }
}
