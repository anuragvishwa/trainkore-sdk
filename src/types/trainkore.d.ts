declare module 'trainkore' {
    export class TrainkoreChatPrompt {
      constructor(apiUrl: string);
      create(data: {
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
          model: {
            value: string;
            label: string;
          };
        };
      }, token: string): Promise<any>;
    }
  
    export class TrainkoreLog {
      constructor(apiUrl: string);
      getLogsByProjectId(projId: string, token: string): Promise<any>;
      getLogByLogId(logId: string, token: string): Promise<any>;
    }
  
    export default class Trainkore {
      constructor(apiKey: string, apiUrl?: string);
      getToken(): string | null;
      chat: { completions: TrainkoreChatPrompt };
      log: TrainkoreLog;
    }
  }
  