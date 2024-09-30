import axios from 'axios';

export class TrainkoreChatPrompt {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // Method to create a chat completion, using the JWT token for authentication
  async create(data: {
    projId: string;
    versionId: string;
    topic: string;
    userId: string;
    userInput: {
      userInput: { [key: string]: string };
      selectedOptions: { [key: string]: { value: string; label: string } };
      inputValue: { [key: string]: string };
      imageCards: { [key: string]: any };
    };
    userInputData: {
      promptCards: Array<{ id: number }>;
      userInputData: { [key: string]: string };
      selectedOptionsData: { [key: string]: { value: string; label: string } };
    };
    prevOutput: object;
    tools: {
      tools: Array<any>;
      toolsData: object;
    };
    getStocksPrice: {
      getStocksPrice: Array<any>;
    };
    scheduleMeeting: {
      scheduleMeeting: Array<any>;
    };
    parametersValue: {
      stopSliderValue: number;
      topP: number;
      temperature: number;
      max_tokens: number;
      frequency_penalty: number;
      presence_penalty: number;
      model: {
        value: string;
        label: string;
      };
    };
    commitMessage: string;
    cards: {
      cards: Array<{ id: number }>;
    };
    newTool: {
      newTools: Array<{ id: number }>;
      newToolData: { [key: string]: string };
    };
  }, token: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/chatPrompt`, data, {
        headers: {
          Authorization: `Bearer ${token}`,  // Use the JWT token
          'Content-Type': 'application/json',
        },
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
          `Failed to create chat prompt: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('Failed to create chat prompt: No response received from server');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error(`Failed to create chat prompt: ${error.message}`);
      }
    }
  }

  // Method to retrieve a chat prompt by ID using the JWT token
  async retrieve(chatId: string, token: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/chatPrompt/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Use the JWT token for authorization
        },
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
          `Failed to retrieve chat prompt: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('Failed to retrieve chat prompt: No response received from server');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error(`Failed to retrieve chat prompt: ${error.message}`);
      }
    }
  }
}
