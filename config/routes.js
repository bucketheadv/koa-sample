//'use strict';
var path = require('path');
var fs   = require('fs');
var routes_path = path.join(__dirname, 'routes');

fs.readdirSync(routes_path).filter(function(file) {
  return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
}).forEach(function(file) {
  app.use(require(path.join(routes_path, file)).routes());
});
