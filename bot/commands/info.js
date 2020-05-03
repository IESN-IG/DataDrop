const { stripIndent } = require('common-tags');
const { generateTimeString } = require('../../utils');
const birthdate = 1566941040000;

module.exports = {
  name: 'info',
  description: 'Affiche quelques infos sur le bot',

  async execute(client, logger, message, args) {
    const age = generateTimeString(birthdate);
    
    const tiiBz = await client.users.fetch('137036019164905472');
    const drakexorn = await client.users.fetch('103812667847770112');
    
    message.channel.send(stripIndent`
      **${client.user.username}** est le bot non-officiel du département IESN de l'Hénallux, développé en Javascript avec **DiscordJS**.

      :birthday: Il a ${age}!

      Un merci spécial à:
      \t- **${tiiBz.tag}** pour son aide à maintenir la liste des emails de profs à jour! :tada:
      \t- **${drakexorn.tag}** pour sa volonté et son aide dans l'ouverture du bot à plusieurs guildes! :tada:

      Pour apprendre à l'utilisation, utilisez la commande \`help\`. Pour un lien vers le code source, utilisez la commande \`github\`.
    `);
  }
};
