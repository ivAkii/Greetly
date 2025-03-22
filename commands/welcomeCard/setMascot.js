const WelcomeSettings = require('../../models/WelcomeSettings');

module.exports = {
  name: "setMascotImage",
  aliases: ["setmc", "mascot"],
  category: "Welcome Card",
  usage: "setMascotImage <image_url>",
  description: "Set the mascot image for the welcome card.",
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
      { $set: { mascotImage: imageUrl } },
      { upsert: true }
    );

    message.channel.send(`Mascot image has been updated to: ${imageUrl}`);
  },
};
