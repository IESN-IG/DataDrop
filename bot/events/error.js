const eventListener = (client, logger, error) => {
  logger.error(error.stack);
};

module.exports = {
  name: 'error',
  listen: eventListener,
};
