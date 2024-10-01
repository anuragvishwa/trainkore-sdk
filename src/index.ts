import axios from 'axios';
import { TrainkoreChatPrompt } from './chatPrompt';  // Check exports in './chatPrompt.ts'
import { TrainkoreLog } from './log';  // Check exports in './log.ts'

export default class Trainkore {
  public chatPrompt: TrainkoreChatPrompt;
  public log: TrainkoreLog;
  private jwtToken: string | null = null;
  protected static defaultApiUrl = 'https://traincore.visualith.com/api';
  protected loginPromise: Promise<void> | null = null;
  public apiUrl: string;
  private apiKey: string;

  // Private constructor to prevent direct instantiation
  private constructor(apiKey: string, apiUrl: string = Trainkore.defaultApiUrl) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.chatPrompt = new TrainkoreChatPrompt(this);
    this.log = new TrainkoreLog(this);
    this.loginPromise = this.autoLogin();
  }

  // Static method to create an instance without the constructor
  public static async createInstance(apiKey: string, apiUrl: string = Trainkore.defaultApiUrl): Promise<Trainkore> {
    const instance = new Trainkore(apiKey, apiUrl);
    await instance.loginPromise; // Wait for the login to complete
    return instance;
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
      return this.jwtToken;
    }

    // If login is still in progress, wait for it
    if (this.loginPromise) {
      await this.loginPromise;
    }

    return this.jwtToken;
  }
}
