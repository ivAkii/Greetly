const { createCanvas, loadImage } = require('@napi-rs/canvas');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const WelcomeSettings = require('../models/WelcomeSettings');

module.exports = async (member) => {
  try {
    const settings = await WelcomeSettings.findOne({ guildId: member.guild.id });
    if (!settings || !settings.welcomeChannel) {
      console.error('Welcome settings or welcome channel is not configured.');
      return;
    }

    const channel = member.guild.channels.cache.get(settings.welcomeChannel);
    if (!channel) {
      console.error('The configured welcome channel does not exist.');
      return;
    }

    if (settings.welcomeType === 'message') {
      const description = settings.description || 'Welcome to the server!';
      const formattedDescription = description
        .replace(/`?\?user`?/g, member.user.username)
        .replace(/`?\?server`?/g, member.guild.name)
        .replace(/`?\?tag`?/g, member.user.tag)
        .replace(/`?\?mention`?/g, `<@${member.user.id}>`)
        .replace(/`?\?rank`?/g, member.guild.memberCount);

      const embed = new EmbedBuilder()
        .setTitle(`Welcome to ${member.guild.name}`)
        .setDescription(formattedDescription)
        .setColor('Random')
        .setThumbnail(settings.thumbnail || member.guild.iconURL({ dynamic: true }))
        .setImage(settings.image || null);

      return channel.send({ embeds: [embed] });
    }

    const [bgImage, fgImage, mascotImage, profileImage] = await Promise.all([
      loadImage(settings.bgImage || './assets/bg.png'),
      loadImage(settings.fgImage || './assets/fg.png'),
      loadImage(settings.mascotImage || './assets/mascot.png'),
      loadImage(member.user.displayAvatarURL({ format: 'jpg', size: 1024 })),
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
    ctx.fillText('HELLO,', profileX + profileSize - 40, profileY - 18);

    ctx.fillStyle = settings.usernameColor || '#FFFFFF';
    ctx.fillText(member.user.username.toUpperCase(), profileX + profileSize + 100, profileY - 18);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Montserrat-Bold';
    const text2 = `WELCOME TO ${member.guild.name.toUpperCase()}`;
    ctx.fillText(text2, profileX + profileSize - 40, profileY + 18);

    ctx.drawImage(mascotImage, 0, 0, canvas.width, canvas.height);

    const buffer = canvas.toBuffer('image/png');
    await channel.send({
      files: [new AttachmentBuilder(buffer, { name: 'welcome-image.png' })],
    });
  } catch (error) {
    console.error('Failed to send welcome:', error);
  }
};
