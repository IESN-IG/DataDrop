const { Collection, MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const paginationEmbed = require('discord.js-pagination');
const { people } = require('../emails');

// TODO: add pagination through message reaction
function generateMessage(array) {
  if (array === undefined || (array.length && array.length === 0)) return '';

  array = array
    .sort((p1, p2) => {
      if (p1.lastname < p2.lastname) return -1;
      if (p1.lastname > p2.lastname) return 1;
      return 0;
    })
    .filter((x) => x.emails && x.emails.length > 0);

  const embeds = [];
  for (let i = 0; i < array.length; i += 5) {
    const embed = new MessageEmbed()
      .setAuthor(
        `Emails correspondant à vos critères`,
        'https://i.imgur.com/Gl37dXV.png'
      )
      .setColor('RANDOM');

    for (let j = i; j < i + 5 && j < array.length; j++) {
      const person = array[j];
      embed.addField(
        `${person.lastname.toUpperCase()} ${person.firstname}`,
        person.emails.join('; ')
      );
    }

    embeds.push(embed);
  }

  return embeds;
}

module.exports = {
  subcommands: new Collection([
    ['help', { description: "Affiche l'aide d'une sous-commande" }],
    ['liste', { description: 'Affiche tous les emails' }],
  ]),
  name: 'email',
  usage: '<nom>',
  args: true,
};

module.exports.description =
  'Affiche une liste de mails selon les paramètres entrés.' +
  '\n**Sous-commandes:**\n' +
  `${module.exports.subcommands.keyArray().join(', ')}`;

module.exports.execute = async (client, log, message, args) => {
  let embeds = [];

  switch (args[0].toLowerCase()) {
    case 'help':
      if (!args[1]) {
        return message.channel.send(
          'Tu as oublié de spécifier la sous-commande!'
        );
      }

      const subcommandName = args[1].toLowerCase();
      let subcommand = module.exports.subcommands.get(subcommandName);
      if (!subcommand) {
        return message.channel.send("Cette sous-commande n'existe pas.");
      }

      let data = [`**Nom:** ${subcommandName}`];
      if (subcommand.description) {
        data.push(`**Description:** ${subcommand.description}`);
      }
      if (subcommand.usage) {
        data.push(
          `**Usage:** \`${prefix}${module.exports.name} ${subcommandName} ${subcommand.usage}\``
        );
      }

      embeds = [
        new MessageEmbed()
          .setTitle(`Aide pour '${subcommandName}'`)
          .setColor('PURPLE')
          .setDescription(data.join('\n')),
      ];
      break;

    case 'liste':
      embeds = generateMessage(people);
      break;

    default:
      //TODO: optimiser partie "recherche des personnes qui correspondent"
      const matched = new Set();

      for (let i = 0; i < args.length; i++) {
        let matchingPeople = people.filter((person) =>
          `${person.firstname.removeDiacritics()} ${person.lastname.removeDiacritics()}`
            .toLowerCase()
            .includes(args[i].removeDiacritics().toLowerCase())
        );

        for (let item of matchingPeople) {
          matched.add(item);
        }
      }

      if (matched.size === 0) {
        msg =
          ":x: **Oups!** - Il semblerait qu'il n'y ait personne de ce nom enregistré dans la base de données. \nSi vous pensez que ceci est une erreur, vous pouvez contacter un membre du Staff.";
        return message.channel.send(msg);
      }

      embeds = generateMessage([...matched]);
      break;
  }

  await paginationEmbed(message, embeds);
};
