
# Trainkore SDK

Trainkore SDK allows you to interact with the Trainkore API to create chat completions, retrieve chat prompts, and access logs associated with a project. The SDK uses JWT-based authentication to secure API calls.

## Features

- Authenticate using the API key and retrieve a JWT token.
- Create chat prompts.
- Retrieve chat prompts by ID.
- Fetch logs by project ID.
- Fetch logs by log ID.

## Installation

Install the SDK via npm:

```bash
npm install trainkore
```

## Usage

### Initialize Trainkore SDK

To start using the SDK, initialize it with your API key and the Trainkore API URL.

```typescript
import Trainkore from 'trainkore';
//  you can get API key in the settings page of trainkore.com
const apiKey = 'your-trainkore-api-key';
const apiUrl = 'https://traincore.visualith.com/api';

const trainkore = new Trainkore(apiKey, apiUrl);
```

### Authenticate (Login)

Before making any API calls, you need to log in and retrieve a JWT token. This will be used to authenticate all future requests.

```typescript
(async () => {
  try {
    await trainkore.login();  // Login and retrieve JWT token
    const token = trainkore.getToken();  // Retrieve the JWT token
    console.log('JWT Token:', token);
  } catch (error) {
    console.error('Failed to login:', error.message);
  }
})();
```

### Create a Chat Prompt

Once you have the JWT token, you can create a chat prompt by calling the `create` method of `TrainkoreChatPrompt` and passing the necessary data.

```typescript
(async () => {
  const token = trainkore.getToken();
  if (token) {
    try {
      const chatPrompt = await trainkore.chat.completions.create({
        projId: 'your-project-id',
        versionId: 'your-version-id',
        topic: 'Draft an email to ask for leave',
        userId: 'your-user-id',
        userInput: {
          userInput: {
            '1': 'write an email on taking leave from office',
            '2': 'Write an essay on {{topic}}',
            '3': 'Tell me more about {{movie_name}}'
          },
          selectedOptions: {
            '1': { value: 'user', label: 'user' },
            '2': { value: 'user', label: 'user' },
            '3': { value: 'user', label: 'user' }
          },
          inputValue: {
            topic: 'dhoni',
            movie_name: 'My Name is Khan'
          },
          imageCards: {}
        },
        userInputData: {
          promptCards: [{ id: 1 }, { id: 2 }],
          userInputData: {
            '1': 'Who is lord Ram?',
            '2': 'Who is Aamir Khan?',
            '3': 'Write python code to get maximum number in an array'
          },
          selectedOptionsData: {
            '1': { value: 'user', label: 'user' },
            '2': { value: 'user', label: 'user' },
            '3': { value: 'human', label: 'user' }
          }
        },
        prevOutput: {},
        tools: { tools: [], toolsData: {} },
        getStocksPrice: { getStocksPrice: [] },
        scheduleMeeting: { scheduleMeeting: [] },
        parametersValue: {
          stopSliderValue: 50,
          topP: 0.1,
          temperature: 0.3,
          max_tokens: 150,
          frequency_penalty: 0.1,
          presence_penalty: 0.1,
          model: { value: 'custom_model', label: 'custom_model' }
        },
        commitMessage: 'byk',
        cards: { cards: [{ id: 1 }, { id: 2 }] }        
      }, token);
      
      console.log('Chat Prompt Created:', chatPrompt);
    } catch (error:any) {
      console.error('Error creating chat prompt:', error.message);
    }
  }
})();
```

### Retrieve a Chat Prompt by ID

You can retrieve a chat prompt using its ID with the `retrieve` method of `TrainkoreChatPrompt`.

```typescript
(async () => {
  const token = trainkore.getToken();
  if (token) {
    try {
      const chatId = 'your-chat-id';
      const chatPrompt = await trainkore.chat.completions.retrieve(chatId, token);
      console.log('Chat Prompt Retrieved:', chatPrompt);
    } catch (error) {
      console.error('Error retrieving chat prompt:', error.message);
    }
  }
})();
```

### Fetch Logs by Project ID

To fetch logs associated with a project by its `projId`, use the `getLogsByProjectId` method of `TrainkoreLog`.

```typescript
(async () => {
  const token = trainkore.getToken();
  if (token) {
    try {
      const projId = 'your-project-id';
      const logs = await trainkore.log.getLogsByProjectId(projId, token);
      console.log('Logs for Project:', logs);
    } catch (error) {
      console.error('Error fetching logs:', error.message);
    }
  }
})();
```

### Fetch Log by Log ID

To retrieve a specific log by `logId`, use the `getLogByLogId` method of `TrainkoreLog`.

```typescript
(async () => {
  const token = trainkore.getToken();
  if (token) {
    try {
      const logId = 'your-log-id';
      const log = await trainkore.log.getLogByLogId(logId, token);
      console.log('Log Details:', log);
    } catch (error) {
      console.error('Error fetching log:', error.message);
    }
  }
})();
```

## Contributing

Contributions are welcome! Please submit a pull request or file an issue if you encounter any problems.

## License

This SDK is licensed under the MIT License.
