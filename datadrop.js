const { Client } = require('discord.js');
const config = require('./config');
const logger = require('./utils/logger');

process.on('uncaughtException', (err) => {
  logger.fatal(err);

  // best practice is to stop the process on uncaught exceptions
  // as they stands as scenario which should not happen
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

const presence = {
  activity: {
    name: config.version,
    type: 2,
  },
};

const client = new Client({
  disableMentions: 'everyone',
  fetchAllMembers: true,
  presence
});
require('./fileHandler')(client, logger);
client.config = config;

client.init = async () => {
  await client.loadEventsAsync();
  await client.loadCommandsAsync();
  client.login(); // discordjs automatically loads DISCORD_TOKEN from .env file
};

client.kill = async (code = 0) => {
  logger.info(`Arrêt en cours... [Code ${code}]`);
  await client.unloadCommandsAsync();
  await client.destroy();
  process.exit(code);
};

client.init();
