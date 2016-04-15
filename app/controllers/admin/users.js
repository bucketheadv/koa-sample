module.exports.index = function *(next) {
  yield next;

  this.body = 'users/index';
};
