const { Client } = require('discord.js');
const KeyVault = require('@database');

class Datadrop {
  logger;
  client;

  constructor(logger) {
    this.logger = logger;

    const config = {
      ownerId: process.env.OWNER,
      globalPrefix: process.env.PREFIX,
      version: `${process.env.VERSION}-${process.env.TYPE.toLowerCase()}`,
      name: `${process.env.NAME} ${process.env.TYPE}`,
      repository: 'https://github.com/IESN-IG/Datadrop',
    };
    
    this.client = new Client({
      disableMentions: 'everyone',
      fetchAllMembers: true,
      presence: { activity: { name: config.version, type: "LISTENING" } },
    });
    this.client.config = config;
  }

  prepare() {
    require('./fileHandler')(this.client, this.logger);

    this.client.database = new KeyVault(this.logger);
    this.client.getSettings = this.client.database.getGuildSettings;
    this.client.setSettings = this.client.database.setGuildSettings; 
  }

  async init() {
    this.prepare();

    await this.client.loadEventsAsync();
    await this.client.loadCommandsAsync();

    this.client.login(); // discordjs automatically loads DISCORD_TOKEN from .env file
  }

  async kill(code = 0) {
    this.logger.info(`Arrêt en cours... [Code ${code}]`);

    await this.client.unloadCommandsAsync();
    await this.client.destroy();

    process.exit(code);
  }
}

module.exports = Datadrop;
