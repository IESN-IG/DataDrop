const {
  zeroWidthSpace,
  annoncesRoleid,
  informationsChannelid,
  faqChannelid,
  comiteigcestquoiChannelid,
  tutoratChannelid,
  rolesChannelid,
  annoncesChannelid,
} = require('../config');
const { MessageEmbed } = require('discord.js');

const eventListener = (client, logger, member) => {
  if (member.user.bot) return;

  const annoncesRole = member.guild.roles.cache.get(annoncesRoleid);

  const fields = [
    {
      name: zeroWidthSpace,
      value: zeroWidthSpace,
    },
    {
      name: '1. Change ton pseudo',
      value: `Sur Discord, tu peux changer ton pseudo sur chaque serveur (tu as donc un pseudo différent par serveur!). Pour cela, fais un clic-droit sur l'icône du serveur en question et sélectionne **Changer le pseudo**.`,
    },
    {
      name: zeroWidthSpace,
      value: zeroWidthSpace,
    },
    {
      name: '2. Lis les canaux importants',
      value: `En arrivant, tu vas être un peu perdu. C'est normal, il y a beaucoup de choses et c'est pas forcément simple à suivre.\nOn te conseille d'abord de jeter un oeil aux différents canaux listés ci-dessous :\n  - <#${informationsChannelid}>\n  - <#${faqChannelid}>\n  - <#${comiteigcestquoiChannelid}>\n  - <#${tutoratChannelid}>\n  - <#${rolesChannelid}>\n  - <#${annoncesChannelid}>`,
    },
  ];

  const embed = new MessageEmbed()
    .setColor('117da3')
    .setThumbnail(
      'https://cdn.discordapp.com/icons/288659194737983489/6d9aa353290265c6587ac75fd4247f71.png'
    )
    .setTitle('Salut toi!')
    .setDescription(
      `Bienvenue sur le serveur officiel de la section **Informatique de Gestion** de l'IESN.\n\nPour bien commencer l'année, on te recommande de suivre les quelques étapes suivantes :`
    )
    .addFields(fields)
    .setFooter(
      `Le Comité IG`,
      'https://cdn.discordapp.com/icons/491312065785364482/c9d724c34519c57d3cc1c28f79813f73.png'
    )
    .setTimestamp();

  member.roles
    .add(annoncesRole)
    .then((m) =>
      logger.info(
        `Le rôle <${annoncesRole.name}> a été ajouté à <${member.user.tag}> à l'entrée de la guilde`
      )
    )
    .catch(logger.error);

  member
    .send(embed)
    .then((m) =>
      logger.info(
        `Un DM a été envoyé à <${member.user.tag}> à son entrée dans la guilde`
      )
    )
    .catch(logger.error);
};

module.exports = {
  name: 'guildMemberAdd',
  listen: eventListener
};