module.exports = {
  name: 'unload',
  description: 'Unload a command',
  usage: '<command>',
  ownersOnly: true,
  mandatoryArgs: true,
  isNotUnloadable: true,

  execute(client, logger, msg, args) {
    let name = args[0];
    if (!name) return msg.channel.send(':x: Aucune commande donnée!');

    name = name.toLowerCase();

    const didUnload = client.unloadCommand(name);
    if (!didUnload) return msg.channel.send(":x: Je n'ai pas pu déchargé cette commande.");

    msg.channel.send(':ok_hand:');
  },
};