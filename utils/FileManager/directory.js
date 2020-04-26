const getNameFromPath = require('./getNameFromPath');

class Directory {
  name;
  files;
  path;

  constructor(files, path) {
    this.name = getNameFromPath(path);
    this.files = files;
    this.path = path;
  }

  get hasFile() {
    return this.files.length > 0;
  }
}

module.exports = Directory;
