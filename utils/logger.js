const { Logger, LogEventLevel } = require('@hunteroi/advanced-logger');
const logger = new Logger({
  minLevel: LogEventLevel[(process.env.MIN_LEVEL || 'info')],
  includeTimestamp: Boolean(process.env.INCLUDE_TIMESTAMP),
});

module.exports = logger;
