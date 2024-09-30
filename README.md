
# Trainkore SDK

Trainkore SDK allows you to interact with the Trainkore API to create chat completions, retrieve chat prompts, and access logs associated with a project. The SDK uses JWT-based authentication to secure API calls.

## Features

- Create chat prompts.
- Retrieve chat prompts by ID.
- Fetch logs by project ID.
- Fetch logs by log ID.

## Installation

You can install the Trainkore SDK via npm:

```bash
npm install trainkore
```

## Usage

### Initialize Trainkore SDK

To start using the SDK, initialize it with your API key. The API key can be found on the Trainkore platform.

```typescript
import Trainkore from 'trainkore';

const apiKey = 'your-trainkore-api-key';  // Replace with your API key(Settings page)

const trainkore = new Trainkore(apiKey);
```

### Create a Chat Prompt

Once the SDK is initialized, you can create a chat prompt by calling the `create` method.

```typescript
(async () => {
  try {
    const chatPrompt = await trainkore.chatPrompt.create({
      projId: 'your-project-id',
      versionId: 'your-version-id',
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
        }
      },
      parametersValue: {
        stopSliderValue: 50,
        topP: 0.1,
        temperature: 0.3,
        max_tokens: 150,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
        model: { value: 'gpt-4o', label: 'gpt-4o' }
      }
    });
    console.log('Chat Prompt Created:', chatPrompt);
  } catch (error) {
    console.error('Error creating chat prompt:', error.message);
  }
})();
```

### Retrieve a Chat Prompt by ID

You can retrieve a specific chat prompt by its ID using the `getChatPromptById` method.

```typescript
(async () => {
  try {
    const chatId = 'your-chat-id'; // Replace with your chat prompt ID(You'll find in app)
    const chatPrompt = await trainkore.chatPrompt.getChatPromptById(chatId);
    console.log('Retrieved Chat Prompt:', chatPrompt);
  } catch (error) {
    console.error('Error retrieving chat prompt:', error.message);
  }
})();
```

### Fetch Logs by Project ID

To fetch logs associated with a project by its `projId`, use the `getLogsByProjectId` method.

```typescript
(async () => {
  try {
    const projId = 'your-project-id';  // Replace with your project ID("You'll find in app")
    const logs = await trainkore.log.getLogsByProjectId(projId);
    console.log('Project Logs:', logs);
  } catch (error) {
    console.error('Error fetching logs:', error.message);
  }
})();
```

### Fetch Log by Log ID

To retrieve a specific log by `logId`, use the `getLogByLogId` method.

```typescript
(async () => {
  try {
    const logId = 'your-log-id';  // Replace with your log ID(You'll find in app)
    const log = await trainkore.log.getLogByLogId(logId);
    console.log('Log Details:', log);
  } catch (error) {
    console.error('Error fetching log:', error.message);
  }
})();
```

## Contributing

Contributions are welcome! Please submit a pull request or file an issue if you encounter any problems.

## License

This SDK is licensed under the MIT License.
