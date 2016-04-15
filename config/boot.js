global.puts = console.log;
var path = require('path');
var views = require("co-views");

app.root = path.join(__dirname, "..");

app.render = views(path.join(app.root, 'app/views'), { ext: 'ejs'});
app.controllers = require(path.join(app.root, "./config/initialize/controllers"));
app.controller = function (controllerName) {
  //if (controllerName.slice(-3) != '.js') {
  //  controllerName += ".js";
  //}
  //return require(path.join(app.root, "app/controllers", controllerName));
  eval("this.controllers." + controllerName);
};
