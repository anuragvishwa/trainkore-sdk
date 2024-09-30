import axios from 'axios';

export class TrainkoreAuth {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async makeAuthorizedRequest(endpoint: string, data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error response from server:', error.response.status, error.response.data);
        throw new Error(`Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('No response received from server:', error.request);
        throw new Error('No response received from server');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error(`Error making request: ${error.message}`);
      }
    }
  }
}
