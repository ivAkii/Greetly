const WelcomeSettings = require('../../models/WelcomeSettings');

module.exports = {
  name: "setUsernameColor",
  aliases: ["setcolor", "usernameColor", "color"], // Simplified aliases
  category: "Welcome Card",
  usage: "setUsernameColor <hex_color>",
  description: "Set the username color for the welcome card.",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("You do not have enough permission to use this command.");
    }

    const color = args[0];
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;

    if (!color || !hexRegex.test(color)) {
      return message.channel.send("Please provide a valid hex color code (e.g., #FFFFFF).");
    }

    await WelcomeSettings.findOneAndUpdate(
      { guildId: message.guild.id },
      { $set: { usernameColor: color } },
      { upsert: true }
    );

    message.channel.send(`Username color has been updated to: ${color}`);
  },
};
