const Discord = require("discord.js");
const WelcomeSettings = require("../../models/WelcomeSettings");

module.exports = {
  name: "setthumbnail",
  aliases: ["thumb"],
  category: "Welcome Message",
  usage: "thumb <link>",
  description: "Set the thumbnail for the welcome message",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("You do not have enough permission to use this command.");
    }

    const text = args.join(" ");
    if (!text || text.length > 1000) {
      return message.channel.send(`**${message.author.username}**, please provide a valid link.`);
    }

    await WelcomeSettings.findOneAndUpdate(
      { guildId: message.guild.id },
      { $set: { thumbnail: text } },
      { upsert: true }
    );

    message.channel.send(`Now the welcome thumbnail will be:\n\`${text}\``);
  },
};