var mongoose = require('mongoose');
var jsonBody = require('body/json');

var schema = new mongoose.Schema({
  username: String
});

module.exports.login = function (req, res) {
  jsonBody(req, res, function (err, body) {
    if (err) {
      res.statusCode = 500;
      throw err;
      return res.end('HTTP error');
    }
    var User = mongoose.model('users', schema);
    var cond = {
      username: body.username
    }
    User.findOne(cond, function (err, user) {
      if (err) throw err;
      if (user) {
        req.session.user = user;
        res.json(user);
      } else {
        User.create(cond, function (err, user) {
          if (err) throw err;
          req.session.user = user;
          res.json(user);
        });
      }
    });
  });
}

module.exports.auth = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.send(401, 'Please login');
  }
}
