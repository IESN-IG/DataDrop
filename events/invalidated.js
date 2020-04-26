const eventListener = (client, logger) => {
  logger.fatal('Client\'s session becomes invalidated!');
  client.kill(1);
};

module.exports = {
  name: 'invalidated',
  listen: eventListener,
};
