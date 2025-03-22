const Discord = require("discord.js");
const WelcomeSettings = require("../../models/WelcomeSettings");

module.exports = {
  name: "testWelcomeMessage",
  aliases: ["test"], // Simplified aliases
  category: "Misc",
  description: "Test the welcome message.",
  run: async (client, message, args) => {
    try {
      const settings = await WelcomeSettings.findOne({ guildId: message.guild.id });
      if (!settings || !settings.welcomeChannel) {
        return message.channel.send("Welcome settings are not configured for this server.");
      }

      const channel = message.guild.channels.cache.get(settings.welcomeChannel);
      if (!channel) {
        return message.channel.send("The configured welcome channel does not exist.");
      }

      const description = settings.description || "Welcome to the server!";
      const thumbnail = settings.thumbnail || message.guild.iconURL({ dynamic: true });
      const image = settings.image || null;

      const formattedDescription = description
        .replace(/`?\?user`?/g, message.author.username)
        .replace(/`?\?server`?/g, message.guild.name)
        .replace(/`?\?tag`?/g, message.author.tag)
        .replace(/`?\?mention`?/g, `<@${message.author.id}>`)
        .replace(/`?\?rank`?/g, message.guild.memberCount);

      const embed = new Discord.MessageEmbed()
        .setTitle(`Welcome to ${message.guild.name}`)
        .setDescription(
          `${formattedDescription}`)
        .setColor("RANDOM")
        .setImage(image)
        .setThumbnail(thumbnail);

      await channel.send(embed);
    } catch (error) {
      console.error("Error in test command:", error);
      message.channel.send("An error occurred while testing the welcome message.");
    }
  },
};