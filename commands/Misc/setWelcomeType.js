const WelcomeSettings = require('../../models/WelcomeSettings');

module.exports = {
  name: "setWelcomeType",
  aliases: ["settype", "type"], // Simplified aliases
  usage: "setWelcomeType <card|message>",
  category: "Misc",
  description: "Set the type of welcome (card or message).",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("You do not have enough permission to use this command.");
    }

    const type = args[0]?.toLowerCase();
    if (!["card", "message"].includes(type)) {
      return message.channel.send("Please specify a valid type: `card` or `message`.");
    }

    await WelcomeSettings.findOneAndUpdate(
      { guildId: message.guild.id },
      { $set: { welcomeType: type } },
      { upsert: true }
    );

    message.channel.send(`Welcome type has been updated to: ${type}`);
  },
};
