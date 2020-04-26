class ModuleFile {
  _path;
  _name;
  _extension;

  constructor(path, name, extension) {
    this._path = path;
    this._name = name;
    this._extension = extension;
  }

  get extension() {
    return this._extension;
  }

  get name() {
    return this._name;
  }

  get path() {
    return this._path;
  }
}

module.exports = ModuleFile;
