const { Logger, LogEventLevel } = require('@hunteroi/advanced-logger');
const log = new Logger({
  minLevel: LogEventLevel[(process.env.MIN_LEVEL || 'info').toLowerCase()],
  includeTimestamp: Boolean(process.env.INCLUDE_TIMESTAMP),
});

module.exports = log;
