import axios from 'axios';
import { TrainkoreAuth } from './auth';
import { TrainkoreChatPrompt } from './chatPrompt';
import { TrainkoreLog } from './log';

export default class Trainkore {
  public auth: TrainkoreAuth;

  public chatPrompt: TrainkoreChatPrompt;
  public log: TrainkoreLog;
  private jwtToken: string | null = null;  // Store the JWT token here

  // Define the 'chat' object with 'completions' as a nested object
  public chat: { completions: TrainkoreChatPrompt };

  constructor(private apiKey: string, private apiUrl: string = 'https://traincore.visualith.com/api') {
    // Initialize instances with the API key and URL
    this.auth = new TrainkoreAuth(apiKey, apiUrl);
    this.chatPrompt = new TrainkoreChatPrompt(apiUrl);  // Pass only apiUrl, no need for apiKey directly now
    this.log = new TrainkoreLog(apiUrl);

    // Initialize the 'chat' property with 'completions' pointing to the chatPrompt instance
    this.chat = {
      completions: this.chatPrompt,
    };
  }

  // Method to login and retrieve JWT token
  async login(): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        apiKey: this.apiKey
      });

      if (response.data.token) {
        this.jwtToken = response.data.token;  // Store the JWT token
        console.log('Login successful, token obtained');
      } else {
        throw new Error('Login failed, no token received');
      }
    } catch (error: any) {
      console.error('Login failed:', error.message);
      throw new Error('Failed to login and retrieve token');
    }
  }

  // Get JWT token
  getToken(): string | null {
    return this.jwtToken;
  }
}
