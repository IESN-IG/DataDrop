class Channel {
  name;
  id;

  constructor(name, id) {
    if (String.isNullOrWhiteSpace(name)) throw new Error('name cannot be null, empty, or only contain whitespaces');
    if (String.isNullOrWhiteSpace(guildId)) throw new Error('id must be a string and cannot be null, empty or only contain whitespaces');
    this.name = name;
    this.id = id;
  }
}

module.exports = Channel;
