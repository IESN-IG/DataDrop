module.exports = {
  name: 'version',
  description: 'Affiche la version du bot qui est employée',

  execute(client, logger, message, args) {
    message.channel.send(`Je tourne sur la version ${client.config.version}.`);
  },
};
