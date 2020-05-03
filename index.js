require('module-alias/register');
require('./utils/objectExtensions');
require('dotenv-flow').config({ silent: true });

const Datadrop = require('@bot/datadrop');
const logger = require('@logger');

process.on('uncaughtException', (err) => {
  logger.fatal(err);

  // best practice is to stop the process on uncaught exceptions
  // as they stands as scenario which should not happen
  process.exit(1);
});

process.on('unhandledRejection', logger.error);

const datadropClient = new Datadrop(logger);
datadropClient.init();
