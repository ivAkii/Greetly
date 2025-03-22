const WelcomeSettings = require('../../models/WelcomeSettings');

module.exports = {
  name: "setForegroundImage",
  aliases: ["setfg", "foreground"],
  category: "Welcome Card",
  usage: "setForegroundImage <image_url>",
  description: "Set the foreground image for the welcome card.",
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
      { $set: { fgImage: imageUrl } },
      { upsert: true }
    );

    message.channel.send(`Foreground image has been updated to: ${imageUrl}`);
  },
};
