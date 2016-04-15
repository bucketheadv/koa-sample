exports.pageNotFound = function () {
  return function *pageNotFound(next){
    yield next;

    if (404 != this.status) return;

    this.status = 404;
    switch (this.accepts('html', 'json')) {
      case 'html':
        this.type = 'html';
        this.body = '<p>404 Page Not Found</p>';
        break;
      case 'json': 
        this.body = {
          status: this.status,
          message: 'Page Not Found'
        };
        break;
      default:
        this.type = 'text';
        this.body = 'Page Not Found';
    }
  };
}

