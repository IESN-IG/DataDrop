class NotAPathError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotAPathError);
  }
}

function getNameFromPath(path) {
  if (typeof path !== 'string') throw new TypeError();

  if (path.includes('/')) return path.split('/').pop();
  else if (path.includes('\\')) return path.split('\\').pop();
  throw new NotAPathError();
}

module.exports = getNameFromPath;
