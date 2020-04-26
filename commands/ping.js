module.exports = {
  name: 'ping',
  description: 'Pong!',

  execute(client, logger, message, args) {
    message.channel
      .send('Calcul en cours...')
      .then((m) => m.edit(`Pong: ${client.ws.ping} ms`));
  },
};
