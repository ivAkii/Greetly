const Discord = require("discord.js");
const WelcomeSettings = require('../../models/WelcomeSettings');

module.exports = {
  name: "setWelcomeChannel",
  aliases: ["setwelcome", "channel"], // Simplified aliases
  usage: "setWelcomeChannel <#channel>",
  category: "Misc",
  description: "Set the welcome channel",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("You do not have enough permission to use this command.");
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.channel.send("You have to specify the channel.");
    }

    await WelcomeSettings.findOneAndUpdate(
      { guildId: message.guild.id },
      { $set: { welcomeChannel: channel.id, welcomeType: "card" } },
      { upsert: true }
    );

    message.channel.send(`Welcome channel updated as ${channel} and welcome type set to default ("card").`);
  },
};