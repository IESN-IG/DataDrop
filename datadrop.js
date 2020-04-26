const { Client } = require('discord.js');
const config = require('./config');
const logger = require('./utils/logger');

const client = new Client({ disableMentions: 'everyone', fetchAllMembers: true });
require('./fileHandler')(client, logger);
client.config = config;

client.init = async () => {
  await client.loadEventsAsync();
  await client.loadCommandsAsync();
  client.login(); // discordjs automatically loads DISCORD_TOKEN from .env file
};

client.kill = async () => {
  logger.info('Arrêt en cours...');
  await client.unloadCommandsAsync();
  await client.destroy();
  process.exit();
};

client.init();