# Welcome Bot

Welcome Bot is a Discord bot designed to provide customizable welcome messages and images for your server.

## Features

- **Custom Welcome Messages**: Send personalized text-based welcome messages.
- **Custom Welcome Images**: Generate visually appealing welcome cards with user avatars.
- **Easy Configuration**: Set up welcome channels, descriptions, images, and more with simple commands.
- **MongoDB Integration**: Store and manage settings for each server.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ivAkii/Welcome-Bot.git
   cd Welcome-Bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the bot:
   - Rename `.env.example` to `.env` and fill in your bot token and MongoDB connection URL.
   - Update `config.json` with your desired prefix and developer ID.

4. Start the bot:
   ```bash
   npm start
   ```

## Commands

### General Commands
- `help` - Displays a list of available commands or details about a specific command.

### Welcome Configuration Commands
- `setWelcomeChannel <#channel>` - Set the channel for welcome messages.
- `setDescription <message>` - Set the description for welcome messages.
- `setThumbnail <link>` - Set the thumbnail for welcome messages.
- `setImage <link>` - Set the image for welcome messages.
- `setWelcomeType <card|message>` - Choose between text-based or image-based welcome messages.
- `reset` - Reset all welcome settings.

### Testing Commands
- `testWelcomeMessage` - Test the current welcome message configuration.
- `testWelcomeImage` - Test the current welcome image configuration.

## Requirements

- Node.js v14 or higher
- MongoDB database
- Discord bot token

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

## Acknowledgments

This bot is maintained by **netizenakii** and is a fork of the original project by **Atreya#2401**.
