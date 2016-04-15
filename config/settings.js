'use strict';

var path = require('path');
var version = require(path.join(app.root, "package.json")).version;

var config = {
  version: version,
  debug: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000
};

module.exports = config;
