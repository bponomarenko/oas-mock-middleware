const { validateSpec } = require('./utils.js');

// Default option values
const defaultOptions = {
  validateSpecs: true,
};

const middlewareFactory = (specs, options = {}) => {
  // Merge options with default values
  options = { ...defaultOptions, ...options };
  
  if (options.validateSpecs) {
    if (validateSpec(spec)) {
      console.log('Spec is valid');
    } else {
      throw new Error('fail');
    }
  }

  return (req, res, next) => {
    console.log(req.baseUrl);
    return next();
  };
};

module.exports = middlewareFactory;
