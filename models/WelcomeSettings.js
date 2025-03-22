const mongoose = require("mongoose");

const WelcomeSettingsSchema = new mongoose.Schema({
  guildId: String, // The ID of the guild (server) this setting belongs to
  bgImage: String, // URL of the background image for the welcome card
  fgImage: String, // URL of the foreground image for the welcome card
  mascotImage: String, // URL of the mascot image for the welcome card
  usernameColor: { type: String, default: "#FFFFFF" }, // Hex color code for the username text
  welcomeChannel: String, // ID of the channel where welcome messages are sent
  welcomeType: { type: String, default: "card" }, // Type of welcome: "card" for image or "message" for text
  description: { type: String, default: "Welcome to the server!" }, // Welcome message description
  thumbnail: String, // URL of the thumbnail for the welcome message
  image: String // URL of the image for the welcome message
});

module.exports = mongoose.model("WelcomeSettings", WelcomeSettingsSchema);
