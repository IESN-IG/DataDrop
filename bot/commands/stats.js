const { MessageEmbed } = require('discord.js');
const { generateTimeString } = require('../../utils');

module.exports = {
  name: 'stats',
  description: 'Affiche quelques infos sur le bot',

  execute(client, logger, message, args) {
    const embed = new MessageEmbed()
      .setAuthor('Statistiques du Bot')
      .addFields([
        {
          name: 'Guildes',
          value: client.guilds.cache.size.toString(),
          inline: true,
        },
        {
          name: 'Salons',
          value: client.channels.cache.size.toString(),
          inline: true,
        },
        {
          name: 'Utilisateurs',
          value: client.users.cache.size.toString(),
          inline: true,
        },
        {
          name: 'RAM',
          value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MiB`,
          inline: true,
        },
        { name: 'Version', value: `${client.config.version}`, inline: true },
        { name: 'Uptime', value: `${generateTimeString(client.readyAt)}` },
      ])
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp();

    message.channel.send(embed);
  },
};
