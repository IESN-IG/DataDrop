const set = require('set-value');
const get = require('get-value');
const has = require('has-value');

class GuildSettings {
  guildId;
  guildPrefix;
  roleIds = {};
  textChannelIds = {};
  voiceChannelIds = {};
  emotes = {};
  active;

  constructor(
    guildId,
    guildPrefix = 'iesn!',
    roleIds = {},
    textChannelIds = {},
    voiceChannelIds = {},
    emotes = {},
    active = true
  ) {
    this.guildId = guildId.toString();
    this.guildPrefix = guildPrefix;
    this.roleIds = roleIds;
    this.textChannelIds = textChannelIds;
    this.voiceChannelIds = voiceChannelIds;
    this.emotes = emotes;
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
    properties.forEach(prop => {
      const propValue = guildSettings[prop];
      this.setValue(prop, propValue);
    });
    return this;
  }
}

module.exports = GuildSettings;
