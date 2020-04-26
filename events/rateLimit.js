const eventListener = (client, logger, rateLimitInfo) => {
  logger.warn(`Ratelimit de ${rateLimitInfo.limit} requêtes atteinte pour ${rateLimitInfo.route} (${rateLimitInfo.method}). Durée: ${rateLimitInfo.timeout}`);
};

module.exports = {
  name: 'rateLimit',
  listen: eventListener,
};
