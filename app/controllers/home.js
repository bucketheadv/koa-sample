module.exports.index = function *(next) {
  yield next;
  //this.body = "heheda";
  //this.body = yield app.render('users/index', { user: '123'});
  yield this.render('users/index', {layout: false, user: '123'});
}
