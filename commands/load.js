module.exports = {
  name: 'load',
  description: 'Charge une commande',
  usage: '<commande>',
  aliases: ['charge'],
  ownersOnly: true,
  mandatoryArgs: true,
  isNotUnloadable: true,

  async execute(client, logger, msg, args) {
    let name = args[0];
    if (!name) return msg.channel.send(':x: Aucune commande donnée!');

    const didLoad = await client.loadCommandAsync(name.toLowerCase());
    if (!didLoad)
      return msg.channel.send(':x: Je n\'ai pas pu chargé cette commande.');

    msg.channel.send(':ok_hand:');
  },
};