const { EmbedBuilder } = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {
  name: "help",
  aliases: ["commands"],
  description: "Get a list of all commands or details about a specific command.",
  usage: "help [command]",
  category: "Misc",
  run: async (client, message, args) => {
    if (args[0]) {
      // Show details for a specific command
      const command =
        client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

      if (!command) {
        return message.channel.send(`Unknown Command: \`${args[0]}\``);
      }

      const embed = new EmbedBuilder()
        .setTitle(`📄 Command: ${command.name}`)
        .addFields(
          { name: "📝 Description", value: command.description || "No description provided." },
          { name: "📖 Usage", value: `\`${prefix}${command.usage || "No usage provided."}\`` },
          { name: "🔗 Aliases", value: command.aliases ? `\`${command.aliases.join(", ")}\`` : "None" }
        )
        .setColor("#FFDE00");

      return message.channel.send({ embeds: [embed] });
    }

    // Show a list of all commands grouped by category
    const categories = {};
    client.commands.forEach((command) => {
      const category = command.category || "Uncategorized";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(command.name);
    });

    const embed = new EmbedBuilder()
      .setTitle("📚 Greetly Help Menu")
      .setDescription(
        `Use \`${prefix}help [command]\` to get details about a specific command.`
      )
      .setColor("#FFDE00");

    for (const [category, commands] of Object.entries(categories)) {
      embed.addFields({
        name: `📂 ${category} Commands`,
        value: `\`${commands.join("`, `")}\``,
      });
    }

    // Add a guide section for mascot, background, and foreground images
    embed.addFields({
      name: "🎨 Customizing Your Welcome Card",
      value: `Personalize your welcome cards with the following commands:\n\n` +
      `- 🖼️ **Set Background Image**: \`${prefix}setBackgroundImage <image_url>\`\n` +
      `- 🌟 **Set Foreground Image**: \`${prefix}setForegroundImage <image_url>\`\n` +
      `- 🐾 **Set Mascot Image**: \`${prefix}setMascotImage <image_url>\`\n\n` +
      `Find templates and examples [here](https://github.com/ivAkii/Greetly/tree/main/assets).`,
    });

    return message.channel.send({ embeds: [embed] });
  },
};
