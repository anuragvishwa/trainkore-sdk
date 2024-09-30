import Trainkore from './index';  // Import the main Trainkore class
import axios from 'axios';

export class TrainkoreChatPrompt {
  private trainkore: Trainkore;  // Reference to the Trainkore class

  constructor(trainkore: Trainkore) {
    this.trainkore = trainkore;
  }

  // Method to create a chat completion
  async create(data: {
    projId: string;
    versionId: string;
    userId: string;
    userInput: {
      userInput: { [key: string]: string };
      selectedOptions: { [key: string]: { value: string; label: string } };
      inputValue: { [key: string]: string };
      imageCards: { [key: string]: any };
    };
    userInputData: {
      userInputData: { [key: string]: string };
      selectedOptionsData: { [key: string]: { value: string; label: string } };
    };
    parametersValue: {
      stopSliderValue: number;
      topP: number;
      temperature: number;
      max_tokens: number;
      frequency_penalty: number;
      presence_penalty: number;
      model: { value: string; label: string };
    };
  }) {
    try {
      const token = await this.trainkore.getToken();  // Ensure token is retrieved
      const response = await axios.post(`${this.trainkore.apiUrl}/chatPrompt`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;  // Return the successful response
    } catch (error: any) {
      this.handleRequestError(error, 'create chat prompt');
    }
  }

  // Method to fetch a chat prompt by ID
  async getChatPromptById(chatId: string) {
    try {
      const token = await this.trainkore.getToken();  // Ensure token is retrieved
      const response = await axios.get(`${this.trainkore.apiUrl}/chatPrompt/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  // Return the fetched chat prompt
    } catch (error: any) {
      this.handleRequestError(error, 'fetch chat prompt by ID');
    }
  }

  // Helper function to handle request errors
  private handleRequestError(error: any, operation: string) {
    if (error.response) {
      console.error(`Error response from server while trying to ${operation}:`, {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(
        `Failed to ${operation}: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
      );
    } else if (error.request) {
      console.error(`No response received from server while trying to ${operation}:`, error.request);
      throw new Error(`Failed to ${operation}: No response received from server`);
    } else {
      console.error(`Error setting up request while trying to ${operation}:`, error.message);
      throw new Error(`Failed to ${operation}: ${error.message}`);
    }
  }
}
