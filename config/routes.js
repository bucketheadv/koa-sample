//'use strict';

module.exports = function routes(app) {
  with(app.controllers) {
    app.get("/home", home.index);
    app.get("/admin/users", admin.users.index)
  }
};

