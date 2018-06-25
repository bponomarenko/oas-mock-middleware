const path = require('path');
const express = require('express');
const createMiddleware = require('./index.js');

const app = express();

createMiddleware(path.resolve('./petstore.yaml'))
  .then(middleware => {
    // console.log(middleware);
    app.use(middleware);
    app.listen(8090);
  });
