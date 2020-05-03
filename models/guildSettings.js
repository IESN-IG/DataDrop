const set = require('set-value');
const get = require('get-value');
const has = require('has-value');

class GuildSettings {
  guildId;
  guildName;
  guildPrefix;
  roleIds;
  textChannelIds;
  voiceChannelIds;
  emotes;
  emails;
  active;

  constructor(
    guildId,
    guildName,
    guildPrefix,
    roleIds = {},
    textChannelIds = {},
    voiceChannelIds = {},
    emotes = {},
    emails = [],
    active = true
  ) {
    if (String.isNullOrWhiteSpace(guildId))
      throw new Error('guildId must be a string and cannot be null, empty or only contain whitespaces');
    if (String.isNullOrWhiteSpace(guildPrefix))
      throw new Error('guildPrefix must be a string and cannot be null, empty or only contain whitespaces');
    if (String.isNullOrWhiteSpace(guildName))
      throw new Error('guildName must be a string and cannot be null, empty or only contain whitespaces');

    this.guildId = guildId;
    this.guildName = guildName;
    this.guildPrefix = guildPrefix;
    this.roleIds = roleIds;
    this.textChannelIds = textChannelIds;
    this.voiceChannelIds = voiceChannelIds;
    this.emotes = emotes;
    this.emails = emails;
    this.active = active;
  }

  getValue(key, options) {
    return get(this, key, options);
  }

  setValue(key, value) {
    set(this, key, value);
    return this;
  }

  hasValue(key) {
    return has(this, key);
  }

  update(guildSettings) {
    const properties = Object.keys(guildSettings);
    properties.forEach((prop) => {
      const propValue = guildSettings[prop];
      this.setValue(prop, propValue);
    });
    return this;
  }
}

module.exports = GuildSettings;
