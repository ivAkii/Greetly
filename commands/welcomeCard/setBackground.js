const WelcomeSettings = require('../../models/WelcomeSettings');

module.exports = {
  name: "setBackgroundImage",
  aliases: ["setbg", "background"], // Simplified aliases
  category: "Welcome Card",
  usage: "setBackgroundImage <image_url>",
  description: "Set the background image for the welcome card.",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("You do not have enough permission to use this command.");
    }

    const imageUrl = args[0];
    if (!imageUrl) {
      return message.channel.send("Please provide a valid image URL.");
    }

    await WelcomeSettings.findOneAndUpdate(
      { guildId: message.guild.id },
      { $set: { bgImage: imageUrl } },
      { upsert: true }
    );

    message.channel.send(`Background image has been updated to: ${imageUrl}`);
  },
};
