const { Directory, ExtensionError, ModuleFile } = require('./models');
const getNameFromPath = require('./getNameFromPath');
const fs = require('fs');
const path = require('path');
const readdirAsync = require('util').promisify(fs.readdir);

async function readDirectoryAsync(directory) {
  let files = [];
  const directoryPath = path.join(__dirname, '../../', directory);
  if (fs.existsSync(directoryPath)) {
    files = await readdirAsync(directoryPath);
  }
  return new Directory(files, directoryPath);
}

async function loadFilesAsync(directoryName, action) {
  const directory = await readDirectoryAsync(directoryName);
  directory.files.forEach(async file => {
    const filePath = path.join(directory.path, file);
    await loadFileAsync(filePath, action);
  });
}

async function loadFileAsync(path, action) {
  if (typeof action !== 'function' && (action.constructor.name !== 'Function' || action.constructor.name !== 'AsyncFunction'))
    throw new TypeError("'action' must be a function!");

  const expectedExtension = 'js';
  const [name, extension] = getNameAndExtensionFromFileName(path);
  const moduleFile = new ModuleFile(path, name, extension);

  if (!moduleFile.extension.endsWith(expectedExtension)) throw new ExtensionError(expectedExtension, moduleFile.extension);

  const requiredModule = require(moduleFile.path);
  if (requiredModule.name)
    requiredModule.name = moduleFile.name;

  if (action.constructor.name === 'AsyncFunction') 
    await action(requiredModule);
  else 
    action(requiredModule);
  
  delete require.cache[require.resolve(moduleFile.path)];
}

function getNameAndExtensionFromFileName(path) {
  const fileNameAndExtension = getNameFromPath(path);
  const values = fileNameAndExtension.split('.');

  if (values.length === 1) throw new ExtensionError();
  if (values.length > 2) {
    const extension = values.pop();
    const name = values.join('.');

    return [name, extension];
  }

  return values;
}

module.exports = {
  loadFilesAsync,
  loadFileAsync,
};
