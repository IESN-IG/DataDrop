module.exports = {
  name: 'stop',
  description: 'Relance le bot',
  ownerOnly: true,

  async execute(client, logger, message, args) {
    await message.channel.send(':ok_hand:');
    client.kill();
  },
};
