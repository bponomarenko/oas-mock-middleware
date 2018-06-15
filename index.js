const parseSpecs = require('./lib/parser.js');
const middlewareFactory = require('./lib/middleware.js');

  // Normalize specs to an array
  // if (typeof specs !== 'array') {
  //   specs = [specs];
  // }

  // // Validate options argument
  // if (typeof options !== 'object') {
  //   throw new TypeError(`"options" argument should be a valid object.`);
  // }

module.exports = (specPaths, options) => parseSpecs(specPaths, options)
  .then(specs => middlewareFactory(specs, {
    ...options,
    validateSpecs: false,
  }));
