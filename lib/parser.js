const parser = require('json-schema-ref-parser');
const { validateSpec } = require('./utils.js');

// Default option values
const defaultOptions = {
  validateSpecs: true,
};

const parseSpecs = (specPath, options = {}) => new Promise((resolve, reject) => {
  // Merge options with default values
  options = { ...defaultOptions, ...options };

  parser.dereference(specPath)
    .then(spec => {
      if (options.validateSpecs) {
        if (validateSpec(spec)) {
          console.log('Spec is valid');
        } else {
          throw new Error('fail');
        }
      }
      return spec;
    })
    .then(resolve)
    .catch(reject);
});

module.exports = parseSpecs;
