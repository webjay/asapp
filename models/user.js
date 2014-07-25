var mongoose = require('mongoose');
var jsonBody = require('body/json');

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  mobile: {
    type: Number
  }
});

var User = mongoose.model('users', schema);

module.exports.login = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) return next(err);
    if (body.username.trim().length < 3) {
      return next('Invalid username');
    }
    var cond = {
      username: body.username.trim().toLowerCase()
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

module.exports.update = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) throw err;
    var obj = body;
    var id = req.params.id;
    delete obj._id;
    User.findByIdAndUpdate(id, obj).exec(function (err, doc) {
      if (err) return next(err);
      res.json(doc);
    });
    // var changes = obj;
    // delete changes._id;
    // Activity.add({
    //   action: 'updated',
    //   user: req.session.user._id,
    //   request: id,
    //   changes: changes
    // });
  });
}
