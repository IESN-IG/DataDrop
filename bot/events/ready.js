const GuildSettings = require('../../models/guildSettings');

const eventListener = async (client, logger) => {
  const totalMessages = 0;
  const databaseGuilds = Array.from(await client.db.guildSettings.keys());
  
  client.guilds.forEach(async guild => {
    logger.info(`Configuration de la guilde ${guild.name} (${guild.id})`);
    if (!databaseGuilds.includes(guild.id)) {
      logger.info(`Ajout des options manquantes en base de données`);
      await client.setSettings(guild.id, new GuildSettings(guild.id.toString(), guild.name, client.config.globalPrefix));
    }

    const rolesChannelId = await client.getSettings(guild.id).textChannelIds.rolesChannelId;
    if (rolesChannelId) {
      logger.info(`Salon pour les rôles trouvé dans la guilde ${guild.id}`);
      const rolesChannel = client.channels.cache.get(rolesChannelId);
      rolesChannel.messages.fetch({ limit: 10 })
        .then(collected => totalMessages += collected.size)
        .catch(logger.error);
    }

    const optionsChannelId = await client.getSettings(guild.id).textChannelIds.optionsChannelId;
    if (optionsChannelId) {
      logger.info(`Salon pour les options trouvé dans la guilde ${guild.id}`);
      const optionsChannel = client.channels.cache.get(optionsChannelId);
      optionsChannel.messages.fetch({ limit: 10 })
        .then(collected => totalMessages += collected.size)
        .catch(logger.error);
    }

    logger.info(`${totalMessages} messages récupérés dans ${guild.name} (${guild.id})`);
  });
  
  logger.info(`Connecté en tant que ${client.user.tag}!`);
};

module.exports = {
  name: 'ready',
  listen: eventListener
};
