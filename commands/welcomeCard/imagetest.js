const Discord = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const WelcomeSettings = require('../../models/WelcomeSettings');

GlobalFonts.registerFromPath('./fonts/Quicksand-SemiBold.ttf', 'Quicksand-SemiBold');
GlobalFonts.registerFromPath('./fonts/Montserratb.ttf', 'Montserrat-Bold');

module.exports = {
  name: "testWelcomeImage",
  aliases: ["imgtest"], // Simplified aliases
  category: "Welcome Card",
  usage: "imgtest",
  description: "Test the welcome image.",
  run: async (client, message, args) => {
    const m = await message.channel.send(`**${message.author.username}**, please wait. Generating a test welcome image...`);

    try {
      const settings = await WelcomeSettings.findOne({ guildId: message.guild.id });
      if (!settings) {
        return message.channel.send("No welcome settings found for this server.");
      }

      const [bgImage, fgImage, mascotImage, profileImage] = await Promise.all([
        loadImage(settings.bgImage || './assets/bg.png'),
        loadImage(settings.fgImage || './assets/fg.png'),
        loadImage(settings.mascotImage || './assets/mascot.png'),
        loadImage(message.author.displayAvatarURL({ format: "jpg", size: 1024 }))
      ]);

      const canvas = createCanvas(800, 200);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

      ctx.drawImage(fgImage, 0, 0, canvas.width, canvas.height);

      const profileSize = 120;
      const profileX = 110;
      const profileY = canvas.height / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(profileImage, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize);
      ctx.restore();

      ctx.fillStyle = '#FFFFFF'; 
      ctx.font = 'bold 35px Montserrat-Bold';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText("HELLO,", profileX + profileSize - 40, profileY - 18);

      ctx.fillStyle = settings.usernameColor || '#FFFFFF';
      ctx.fillText(message.author.username.toUpperCase(), profileX + profileSize + 100, profileY - 18);

      ctx.fillStyle = '#FFFFFF'; 
      ctx.font = 'bold 20px Montserrat-Bold'; 

      let text2 = `WELCOME TO ${message.guild.name.toUpperCase()}`;
      ctx.fillText(text2, profileX + profileSize - 40, profileY + 18);

      ctx.drawImage(mascotImage, 0, 0, canvas.width, canvas.height);

      const buffer = canvas.toBuffer('image/png');
      m.delete();
      return message.channel.send({
        files: [new Discord.MessageAttachment(buffer, "welcome-image.png")],
      });
    } catch (error) {
      console.error('Failed to generate the welcome image:', error);
      return message.channel.send("Failed to generate the welcome image. Please try again later.");
    }
  },
};
