const { generateTimeString } = require('../utils');

module.exports = {
  name: 'uptime',
  aliases: ['disponibilité', 'dispo', 'disponibilite'],
  description: 'Affiche depuis combien de temps le bot est en ligne',

  execute(client, logger, message, args) {
    const msg = `Je suis connecté depuis ${generateTimeString(client.readyAt)}.`;
    message.channel.send(msg);
  },
};
