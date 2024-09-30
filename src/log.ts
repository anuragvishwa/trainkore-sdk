import Trainkore from './index';  // Import the main Trainkore class
import axios from 'axios';

export class TrainkoreLog {
  private trainkore: Trainkore;  // Reference to the Trainkore class

  constructor(trainkore: Trainkore) {
    this.trainkore = trainkore;
  }

  // Method to get logs by project ID
  async getLogsByProjectId(projId: string) {
    try {
      const token = await this.trainkore.getToken();  // Ensure token is retrieved
      const response = await axios.get(`${this.trainkore.apiUrl}/logs/${projId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  // Return the successful response
    } catch (error: any) {
      this.handleError(error, 'fetch logs');
    }
  }

  // Method to get a log by log ID
  async getLogByLogId(logId: string) {
    try {
      const token = await this.trainkore.getToken();  // Ensure token is retrieved
      const response = await axios.get(`${this.trainkore.apiUrl}/log/${logId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  // Return the successful response
    } catch (error: any) {
      this.handleError(error, 'fetch log');
    }
  }

  // Centralized error handler for logs
  private handleError(error: any, action: string) {
    if (error.response) {
      console.error(`Error response from server while trying to ${action}:`, {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(
        `Failed to ${action}: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
      );
    } else if (error.request) {
      console.error(`No response received while trying to ${action}:`, error.request);
      throw new Error(`Failed to ${action}: No response received from server`);
    } else {
      console.error(`Error setting up request while trying to ${action}:`, error.message);
      throw new Error(`Failed to ${action}: ${error.message}`);
    }
  }
}
