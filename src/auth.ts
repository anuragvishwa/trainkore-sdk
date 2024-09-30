import axios from 'axios';

export class TrainkoreAuth {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  // Example method that requires authorization
  async makeAuthorizedRequest(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,  // Use the API key directly in the Authorization header
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to make authorized request: ${error}`);
    }
  }
}
