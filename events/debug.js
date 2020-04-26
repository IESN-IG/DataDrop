const eventListener = (client, logger, info) => {
  logger.debug(info);
};

module.exports = {
  name: 'debug',
  listen: eventListener,
};
