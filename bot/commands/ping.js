module.exports = {
  name: 'ping',
  description: 'Pong!',

  execute(client, logger, message, args) {
    message.channel.send(`Pong: ${client.ws.ping} ms`);
  }
};
