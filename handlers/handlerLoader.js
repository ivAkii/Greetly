const { readdirSync } = require("fs");
const path = require("path");

module.exports = (client) => {
  // Initialize commands and aliases collections
  client.commands = new Map();
  client.aliases = new Map();

  console.log("========================================");
  console.log("          Loading Commands...           ");
  console.log("========================================");

  // Load command handlers from all subfolders
  const commandFolders = [
    path.join(__dirname, "../commands/welcomeCard"),
    path.join(__dirname, "../commands/welcomeMessage"),
    path.join(__dirname, "../commands/Misc"),
  ];

  for (const folder of commandFolders) {
    const commandFiles = readdirSync(folder).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(path.join(folder, file));
      if (command.name) {
        client.commands.set(command.name, command);
        if (command.aliases) {
          command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
        }
        console.log(`✅ Loaded command: ${command.name}`);
      } else {
        console.error(`❌ Failed to load command: ${file} (missing name property)`);
      }
    }
  }

  console.log("========================================");
  console.log("          Loading Events...             ");
  console.log("========================================");

  // Load event handlers
  const eventFiles = readdirSync(path.join(__dirname, "../events")).filter((file) =>
    file.endsWith(".js")
  );
  for (const file of eventFiles) {
    const event = require(path.join(__dirname, "../events", file));
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => event(...args)); // Pass all arguments to the event handler
    console.log(`✅ Loaded event: ${eventName}`);
  }

  console.log("========================================");
  console.log("       All Commands and Events Loaded   ");
  console.log("========================================");
};
