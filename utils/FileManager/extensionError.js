class ExtensionError extends Error {
  constructor(expected, got) {
    super(expected && got ? `Expected ${expected.toString()} but got ${got.toString()}` : 'The file\'s extension could not be found!');
    Error.captureStackTrace(this, ExtensionError);
  }
}

module.exports = ExtensionError;
