const Discord = require("discord.js");
const WelcomeSettings = require("../../models/WelcomeSettings");

module.exports = {
  name: "setdescription",
  aliases: ["desc"], // Simplified aliases
  category: "Welcome Message",
  usage: "desc <message>",
  description: "Set the description for the welcome channel",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("You do not have enough permission to use this command.");
    }

    const text = args.join(" ");
    if (!text || text.length > 1024) {
      return message.channel.send(`**${message.author.username}**, please provide a description with less than 1024 characters.`);
    }

    await WelcomeSettings.findOneAndUpdate(
      { guildId: message.guild.id },
      { $set: { description: text } },
      { upsert: true }
    );

    const formattedText = text
      .replace(/`?\?user`?/g, message.author.username)
      .replace(/`?\?server`?/g, message.guild.name)
      .replace(/`?\?tag`?/g, message.author.tag)
      .replace(/`?\?mention`?/g, `<@${message.author.id}>`);

    message.channel.send(`Now the welcome message description will be:\n\`${formattedText}\``);
  },
};
