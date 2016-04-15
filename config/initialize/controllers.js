var fs = require('fs');
var path = require('path');

var controllersPath = path.join(app.root, 'app/controllers/');
var controllers = {};
var router = require("koa-middlewares").router();
//var _ = require('underscore');

function isValidFile(fileName) {
  return (fileName[0] === '.') ? false : true;
}

function addAction(mods, actions) {
  for (var action in actions) {
    if (actions.hasOwnProperty(action)) {
      actions[action].controllerName = mods[mods.length - 1];
      actions[action].actionName     = action;
    }
  }

  // namespace for controllers
  var action = {};
  var innerAction = action;
  if(mods.length > 1) {
    mods.slice(1).forEach(function(ele, idx) {
      var ns = mods.slice(0, idx + 1);
      if(idx === (mods.length - 2)) {
        // the final element
        innerAction[ele] = actions;
      } else {
        innerAction[ele] = {};
      }
      innerAction = innerAction[ele];
    });
    controllers[mods[0]] = action;
  } else {
    controllers[mods[mods.length - 1]] = actions;
  }
  //_.extend(controllers[mod], actions);
}

function getBasename(fileName) {
  var idx = fileName.lastIndexOf(".");
  if (idx < 0) idx = fileName.length;
  var basename = fileName.substr(0, idx);

  return (basename === '') ? false : basename
}

var readdirSync = function (controllerPath) { 
  fs.readdirSync(controllerPath).filter(isValidFile).forEach(function(name) {
    var basename = getBasename(name);

    if (!basename) return ;
    var fileName = path.join(controllerPath, name);

    if (name.slice(-3) == '.js') {
      var namespace = controllerPath.slice(controllersPath.length).split("/").filter(function(ele) { return (ele != undefined && ele.toString().trim() != '')});
      namespace = namespace.concat(basename)
      addAction(namespace, require(fileName));
    } else {
      readdirSync(fileName);
    }
  });
};

readdirSync(controllersPath);

module.exports = controllers;
