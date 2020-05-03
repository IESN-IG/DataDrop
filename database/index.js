const { join } = require('path');
const Keyv = require('keyv');

class KeyVault {
  logger;
  guildSettings;

  constructor(logger) {
    this.logger = logger;

    this.guildSettings = new Keyv(
      `sqlite://${join(__dirname, '/database.sqlite')}`,
      { namespace: 'guildsettings', table: 'GuildSettings' }
    );
    this.guildSettings.on('error', this.logger.error);
  }

  getGuildSettings(key) {
    return this.guildSettings.get(key);
  }

  setGuildSettings(key, value) {
    return this.guildSettings.set(key, value);
  }
}

module.exports = KeyVault;
