exports.routes = function() {
  return function *routes(next) {
    with(app.controllers) {
      app.get("/home", home.index);
    };
    yield next;
  };
};
