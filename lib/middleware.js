const { validateSpec } = require('./utils.js');

// Default option values
const defaultOptions = {
  validateSpecs: true,
};

const getMatchingRoute = (routes, req) => routes
    .find(route =>
        route.method === req.method.toLowerCase() &&
        true//route.path === req.originalUrl
    );

const isParamsValid = (params, req) => {
    return true;
};

const getSuccessfulResponse = (responses) => {
    return {
        code: 200,
        ...responses['200'],
    };
};

const generateMock = schema => {
    return '';
};

const generateResponse = (resSpec, res) => {
    const { code, headers, content } = resSpec;
    res.status(code);

    console.log(resSpec);
    // set headers
    if (headers) {
        Object.keys(headers).forEach(header => {
            const { schema } = headers[header];
            res.append(header, schema ? generateMock(schema) : '');
        });
    }

    // set content type
    if (content) {
        const contentType = Object.keys(content)[0];
        res.type(contentType);

        // Send content, if specified
        const { schema } = content[contentType];
        if (schema) {
            res.send(generateMock(schema));
        } else {
            res.end();
        }
    }
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

  const routes = Object.keys(specs.paths || {})
    .reduce((acc, path) => {
        const pathObj = specs.paths[path];
        const newRoutes = Object.keys(pathObj)
            .map(method => ({
                path,
                method,
                spec: pathObj[method],
            }));
        return acc.concat(newRoutes);
    }, []);

  return (req, res, next) => {
    // Find matching route
    const matchingRoute = getMatchingRoute(routes, req);
    if (!matchingRoute) {
        return next();
    }

    // Validate route params
    const { parameters, responses } = matchingRoute.spec;
    if (parameters && parameters.length && !isParamsValid(parameters)) {
        // return error code
    }

    const successfulRes = getSuccessfulResponse(responses);
    if (successfulRes) {
        return generateResponse(successfulRes, res);
    } else {
        return next();
    }
  };
};

module.exports = middlewareFactory;
