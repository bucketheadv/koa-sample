var path = require('path');
var render = require('koa-ejs');

render(app,{
  root: path.join(app.root, 'app/views'),
  //layout: '__layout',
  viewExt: 'ejs',
  cache: false,
  debug: true
});
