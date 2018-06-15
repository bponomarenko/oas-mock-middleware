const Ajv = require('ajv');
const openapiSchema = require('openapi-schema');

// Ajv library config
const ajvConfig = {
  allErrors: true,
};

let ajv;

const validateJson = (schema, json) => {
  if (!ajv) {
    ajv = new Ajv(ajvConfig);
  }
  return ajv.validate(schema, json);
};

const validateSpec = spec => validateJson(openapiSchema, spec);

module.exports = {
  validateJson,
  validateSpec,
};
