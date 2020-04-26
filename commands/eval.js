const { clean } = require('../utils');

module.exports = {
  name: 'eval',
  description: 'Évalue du code Javascript.',
  ownerOnly: true,
  args: true,

  async execute(client, logger, message, args) {
    const data = { content: '', options: { code: 'xl' } };
    try {
      const code = args.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled, { depth: 1 });
      }

      data.content = await clean(evaled);
    } catch (err) {
      data.content = await clean(err);
    } finally {
      if (data.content.length > 1900) {
        data.content = data.content.substr(0, 1900);
        data.content += '...';
      }

      logger.verbose(`Eval: ${data.content}`);

      message.channel
        .send(data.content, data.options)
        .catch((e) => logger.error(e));
    }
  },
};
