const { stripIndents } = require('common-tags');

module.exports = {
  name: 'github',
  description: 'Affiche un lien vers le code source.',
  aliases: ['code', 'source', 'repo', 'repository'],

  execute(client, logger, message, args) {
    message.channel.send(stripIndents`
      :link: Mon code source se trouve sur le dépôt distant Github suivant : ${client.config.repository}. 

      :clipboard: Si tu souhaites contribuer, n'hésite pas par commencer à ouvrir une issue!
    `);
  }
};
