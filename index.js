const { prefix } = require("./config.json");
const { config } = require("dotenv");
config(); // Load environment variables from .env file
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const mongoose = require("mongoose");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
const { registerFonts } = require("./utils/fontLoader"); // Import font loader
const loadHandlers = require("./handlers/handlerLoader"); // Import handler loader

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Register fonts
registerFonts();

// Load command and event handlers
loadHandlers(client);

// Handle unhandled promise rejections
process.on("UnhandledRejection", console.error);

// Start the bot
client.on("ready", () => {
  client.user.setStatus("dnd"); // Change to online, dnd, or idle
  console.log(`Successfully logged in as ${client.user.tag} `);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!cmd.length) return;

  const command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (command) {
    try {
      await command.run(client, message, args);
    } catch (error) {
      console.error(`Error executing command ${cmd}:`, error);
      message.channel.send("There was an error executing that command.");
    }
  }
});

client.login(process.env.TOKEN);
