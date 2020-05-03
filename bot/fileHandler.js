const { Collection } = require('discord.js');
const { loadFileAsync, loadFilesAsync } = require('@fileManager');
const path = require('path');

function handleLoading(client, logger) {
  function addCollections() {
    if (!client.commands) {
      client.commands = new Collection();
      logger.info('Commands collection initialized');
    }

    if (!client.aliases) {
      client.aliases = new Collection();
      logger.info('Aliases collection initialized');
    }
  }

  async function addCommandAsync(command) {
    client.commands.set(command.name, command);

    if (command.aliases) {
      command.aliases.forEach((alias) => {
        client.aliases.set(alias, command.name);
      });
    }

    logger.info(`\t- ${command.name}`);
  }

  function removeCommand(commandName) {
    try {
      let command = client.commands.get(commandName);
      if (!command)
        command = client.commands.get(client.aliases.get(commandName));

      if (!command || command.isNotUnloadable) return false;

      logger.info(`\t- ${commandName}`);
      return client.commands.sweep((cmd) => cmd === command) === 1;
    } catch (e) {
      logger.verbose(e.stack);
      return false;
    }
  }

  client.loadEventsAsync = async () => {
    const directoryName = 'events';
    logger.info(`Loading ${directoryName}:`);
    await loadFilesAsync(directoryName, (event) => {
      client.on(event.name, event.listen.bind(null, client, logger));
      logger.info(`\t- ${event.name}`);
    });
  };

  client.loadCommandsAsync = async () => {
    addCollections();
    const directoryName = 'commands';
    logger.info(`Loading ${directoryName}:`);
    await loadFilesAsync(directoryName, addCommandAsync);
  };

  client.loadCommandAsync = async (commandName) => {
    addCollections();
    const directoryName = 'commands';
    try {
      if (client.commands.has(commandName)) return false;

      logger.info(`Loaded from '${directoryName}':`);
      const filePath = path.join(__dirname, directoryName, `${commandName}.js`);
      await loadFileAsync(filePath, addCommandAsync);
      return true;
    } catch (e) {
      logger.verbose(e.stack);
      return false;
    }
  };

  client.unloadCommandsAsync = async () => {
    logger.info(`Unloaded from 'commands':`);
    await Promise.all(
      [...client.commands.keys()].map((commandName) =>
        removeCommand(commandName)
      )
    );
  };

  client.unloadCommand = (commandName) => {
    logger.info(`Unloaded from 'commands':`);
    return removeCommand(commandName);
  };
}

module.exports = handleLoading;
