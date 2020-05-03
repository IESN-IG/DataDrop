const eventListener = (client, logger, info) => {
  logger.warn(info);
};

module.exports = {
  name: 'warn',
  listen: eventListener,
};
