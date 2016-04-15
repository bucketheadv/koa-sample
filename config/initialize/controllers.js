var fs = require('fs');
var path = require('path');

var controllersPath = path.join(app.root, 'app/controllers/');
var controllers = {};
var router = require("koa-middlewares").router();
//var _ = require('underscore');

function isValidFile(fileName) {
  return (fileName[0] === '.') ? false : true;
}

function addAction(mod, actions) {
  for (var action in actions) {
    if (actions.hasOwnProperty(action)) {
      actions[action].controllerName = mod;
      actions[action].actionName     = action;
    }
  }

  //_.extend(controllers[mod], actions);
  controllers[mod] = actions;
}

function getBasename(fileName) {
  var idx = fileName.lastIndexOf(".");
  if (idx < 0) idx = fileName.length;
  var basename = fileName.substr(0, idx);

  return (basename === '') ? false : basename
}

var readdirSync = function (controllersPath) { 
  fs.readdirSync(controllersPath).filter(isValidFile).forEach(function(name) {
    var basename = getBasename(name);

    if (!basename) return ;
    var fileName = path.join(controllersPath, name);

    if (name.slice(-3) == '.js') {
      addAction(basename, require(fileName));
    } else {
      readdirSync(fileName);
    }
  });
};

readdirSync(controllersPath);

module.exports = controllers;
