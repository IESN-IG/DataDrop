const { Collection } = require('discord.js');
const { prefix, communitymanagerRoleid, adminRoleid, deleguesRoleid, ownerId} = require('../config');

module.exports = (client, log, message) => {
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) || message.author.bot) return;

    const isAuthorized = () => {
        return message.author.id === ownerId || message.member.roles.cache.get(communitymanagerRoleid) || message.member.roles.cache.get(adminRoleid);
    };

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    log.info(`${message.author.tag} (${message.author.id}) a utilisé "${command.name}" ${message.channel.type === 'text' ? `dans #${message.channel.name} (${message.channel.id})` : 'en DM'}`);
    
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Je ne peux pas exécuter cette commande en dehors d\'une guilde!');
    }

    if (command.args && !args.length) {
        let reply = `Vous n'avez pas donné d'arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nL'utilisation correcte de cette commande est : \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if ((command.adminOnly || command.ownerOnly) && !isAuthorized()) return;

    try {
        command.execute(client, log, message, args);
    } catch (error) {
        log.error(error);
        message.reply(':x: **Oups!** - Une erreur est apparue en essayant cette commande. Reporte-le à un membre du Staff s\'il te plaît!');
    }
};