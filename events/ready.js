const { rolesChannelid, optionsChannelid, version } = require('../config');

const eventListener = (client, logger) => {
  const rolesChannel = client.channels.cache.get(rolesChannelid);
  const optionsChannel = client.channels.cache.get(optionsChannelid);
  rolesChannel.messages
    .fetch({ limit: 10 })
    .then((collected) =>
      logger.info(collected.size + ' messages récupérés dans ' + rolesChannel.id)
    )
    .catch(logger.error);
  optionsChannel.messages
    .fetch({ limit: 10 })
    .then((collected) =>
      logger.info(collected.size + ' messages récupérés dans ' + optionsChannel.id)
    );

  client.user.setActivity(version);

  logger.info(`Connecté en tant que ${client.user.tag}!`);
};

module.exports = {
  name: 'ready',
  listen: eventListener
};
