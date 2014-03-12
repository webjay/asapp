var mongoose = require('mongoose');
var jsonBody = require('body/json');

var schema = new mongoose.Schema({
  username: String
});

var User = mongoose.model('users', schema);

module.exports.login = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) return next(err);
    var cond = {
      username: body.username
    }
    User.findOne(cond, function (err, user) {
      if (err) return next(err);
      if (user) {
        req.user = user;
        next();
      } else {
        User.create(cond, function (err, user) {
          if (err) return next(err);
          req.user = user;
          next();
        });
      }
    });
  });
}

module.exports.auth = function (req, res, next) {
  if (typeof req.session.user === 'object' && req.session.user !== null) {
    next();
  } else {
    res.send(401, 'Please login');
  }
}
