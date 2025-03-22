# 🎉 Welcome Bot

Welcome Bot is a highly customizable Discord bot designed to enhance your server's onboarding experience with personalized welcome messages and visually appealing welcome cards for free!.

## ✨ Features

🌟 **Custom Welcome Messages**: Send personalized text-based welcome messages with dynamic placeholders.  
🖼️ **Custom Welcome Cards**: Generate visually appealing welcome cards with user avatars and customizable elements.  
⚙️ **Flexible Configuration**: Easily configure welcome channels, descriptions, images, and more using simple commands.  
💾 **MongoDB Integration**: Store and manage server-specific settings efficiently.  
🚀 **Modern Discord.js Support**: Built with the latest Discord.js v14 for optimal performance and compatibility.

## 🚀 Installation

### Prerequisites

- **Node.js**: Version 14 or higher.  
- **MongoDB**: A running MongoDB instance.  
- **Discord Bot Token**: Obtainable from the [Discord Developer Portal](https://discord.com/developers/applications).

### Steps

1️⃣ **Clone the Repository**:  
   ```bash
   git clone https://github.com/ivAkii/Welcome-Bot.git
   cd Welcome-Bot
   ```

2️⃣ **Install Dependencies**:  
   ```bash
   npm install
   ```

3️⃣ **Configure the Bot**:  
   - Rename `.env.example` to `.env` and fill in your bot token and MongoDB connection URL.  
   - Update `config.json` with your desired prefix and developer ID.

4️⃣ **Start the Bot**:  
   ```bash
   npm start
   ```

## 📜 Commands

### 🔧 General Commands

- **`help`**: Displays a list of available commands or details about a specific command.

### 🎨 Welcome Configuration Commands

- **`setWelcomeChannel <#channel>`**: Set the channel for welcome messages.  
- **`setDescription <message>`**: Set the description for welcome messages.  
  - **Supported Tags**:  
    | Tag         | Description                  | Example                     |
    |-------------|------------------------------|-----------------------------|
    | `?user`     | Displays the username only   | `Supreme`                   |
    | `?tag`      | Displays username with tag   | `Atreya#2401`               |
    | `?mention`  | Mentions the user            | `<@519666024220721152>`     |
    | `?server`   | Displays the server name     | `Aromax Development`        |
    | `?rank`     | Displays the join position   | `69th Member`               |
- **`setThumbnail <link>`**: Set the thumbnail for welcome messages.  
- **`setImage <link>`**: Set the image for welcome messages.  
- **`setWelcomeType <card|message>`**: Choose between text-based or image-based welcome messages.

### 🧪 Testing Commands

- **`testWelcomeMessage`**: Test the current welcome message configuration.  
- **`testWelcomeImage`**: Test the current welcome image configuration.

## 🛠️ Requirements

- **Node.js**: Version 14 or higher.  
- **MongoDB**: A running MongoDB instance.  
- **Discord Bot Token**: Obtainable from the [Discord Developer Portal](https://discord.com/developers/applications).

## ✅ Planned Features

- [x] **Upgrade to Discord.js v14**: Ensures compatibility with Discord's API v10.  
- [x] **Switch to MongoDB**: Replaces local databases for better scalability and performance.  
- [x] **Customizable Welcome Cards**: Add support for background, foreground, mascot images, and username colors.  
- [ ] **Support for Multiple Card Sizes**: Allow users to choose from predefined card sizes (e.g., small, medium, large).  
- [ ] **Animated Welcome Cards**: Add support for animated welcome cards (e.g., GIFs or transitions).  
- [ ] **Custom Card Templates**: Enable users to select from a variety of pre-designed card templates.  
- [ ] **Advanced Font Customization**: Allow users to choose fonts, sizes, and styles for text on cards.  
- [ ] **Dynamic Card Layouts**: Provide options for different layouts (e.g., horizontal, vertical, or grid-based).  

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the bot.

## 📜 License

This project is licensed under the [Apache License 2.0](LICENSE).

## 🙌 Acknowledgments

This bot is maintained by **netizenakii** and is a fork of the original project by **Atreya#2401**.

## 🔥 Changes in This Fork

This fork introduces the following main improvements:

1️⃣ **⚡ Upgraded to Discord.js v14**:  
   - Updated the bot to use Discord.js v14, ensuring compatibility with Discord's API v10.  
2️⃣ **💾 Switched to MongoDB**:  
   - Replaced local databases (QuickDB/Better-SQLite3) with MongoDB for better scalability and performance.  
3️⃣ **🎨 Welcome Card with Flexible Configuration**:  
   - Added support for customizable welcome cards with options for background, foreground, mascot images, and username colors.

> **Note**: This fork introduces significant improvements in functionality, performance, and maintainability, making it a more robust and modern version of the original project.

For a detailed list of changes, see [CHANGES.md](CHANGES.md).
