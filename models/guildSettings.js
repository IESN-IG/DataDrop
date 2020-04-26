const set = require('set-value');
const get = require('get-value');
const has = require('has-value');

class GuildSettings {
  guildPrefix;
  roleIds = {};
  textChannelIds = {};
  voiceChannelIds = {};
  emotes = {};

  constructor(
    guildPrefix = 'iesn!',
    roleIds = {},
    textChannelIds = {},
    voiceChannelIds = {},
    emotes = {}
  ) {
    this.guildPrefix = guildPrefix;
    this.roleIds = roleIds;
    this.textChannelIds = textChannelIds;
    this.voiceChannelIds = voiceChannelIds;
    this.emotes = emotes;
  }

  getValue(key, options) {
    return get(this, key, options);
  }

  setValue(key, value) {
    set(this, key, value);
  }

  hasValue(key) {
    return has(this, key);
  }
}

module.exports = GuildSettings;
