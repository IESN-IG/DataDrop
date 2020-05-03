module.exports = {
  name: 'reload',
  description: 'Recharge une ou toutes les commandes',
  aliases: ['recharge'],
  usage: '[commande]',
  ownersOnly: true,
  mandatoryArgs: true,
  isNotUnloadable: true,

  async execute(client, logger, msg, args) {
    let name = args[0];
    if (!name) {
      await client.unloadCommandsAsync();
      await client.loadCommandsAsync();
      return msg.channel.send(':ok_hand: Toutes les commandes ont été rechargées!');
    }

    name = name.toLowerCase();

    const didUnload = client.unloadCommand(name);
    if (!didUnload) return msg.channel.send(':x: Je n\'ai pas pu déchargé cette commande.');

    const didLoad = await client.loadCommandAsync(name);
    if (!didLoad) return msg.channel.send(':x: Je n\'ai pas pu rechargé cette commande.');

    msg.channel.send(':ok_hand:');
  },
};