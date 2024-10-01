import axios from 'axios';
// import { TrainkoreAuth } from './auth.js';  // Check exports in './auth.ts'
import { TrainkoreChatPrompt } from './chatPrompt.js';  // Check exports in './chatPrompt.ts'
import { TrainkoreLog } from './log.js';  // Check exports in './log.ts'

export default class Trainkore {
  // public auth: TrainkoreAuth;
  public chatPrompt: TrainkoreChatPrompt;
  public log: TrainkoreLog;
  private jwtToken: string | null = null;
  protected static defaultApiUrl = 'https://traincore.visualith.com/api';
  protected loginPromise: Promise<void> | null = null;
  public apiUrl: string;

  constructor(private apiKey: string, apiUrl: string = Trainkore.defaultApiUrl) {
    this.apiUrl = apiUrl;
    // this.auth = new TrainkoreAuth(apiKey, this.apiUrl);
    this.chatPrompt = new TrainkoreChatPrompt(this);
    this.log = new TrainkoreLog(this);
    this.loginPromise = this.autoLogin();
  }

  // Automatically log in and store the token
  protected async autoLogin(): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, { apiKey: this.apiKey });
      if (response.data.token) {
        this.jwtToken = response.data.token;
        console.log('Login successful, token obtained');
      } else {
        throw new Error('Login failed, no token received');
      }
    } catch (error: any) {
      console.error('Login failed:', error.message);
      throw new Error('Failed to login and retrieve token');
    }
  }

  // Method to get the token, ensuring login completion before retrieval
  async getToken(): Promise<string | null> {
    if (this.jwtToken) {
      return this.jwtToken;  // Return token if already available
    }

    // If login is still in progress, wait for it
    if (this.loginPromise) {
      await this.loginPromise;
    }

    return this.jwtToken;
  }
}
