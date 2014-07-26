var mongoose = require('mongoose');
var jsonBody = require('body/json');
var formBody = require('body/form');

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groups'
  }]
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


module.exports.admin = {

  auth: function (req, res, next) {
    if (typeof req.session.user === 'object' && req.session.user !== null && req.session.user.admin === true) {
      next();
    } else {
      res.send(401, 'Please login as admin');
    }
  },

  all: function (req, res) {
    User.find().exec(function (err, users) {
      if (err) throw err;
      res.json(users);
    });
  },
  
  update: function (req, res, next) {
    formBody(req, res, function (err, body) {
      if (err) throw err;
      
      if (body.username.length && body.password.length) {
        var cond = {
          username: body.username,
          password: body.password
        }
        User.create(cond);
      }
      
      if (body.users.length && body.groups.length) {
        if (!body.users.isArray) {
          body.users = [ body.users ]
        }
        var cond = {
          '_id': {
            $in: body.users
          }
        };
        var update = {
          $set: {
            groups: body.groups
          }
        };
        var options = {
          multi: true
        };
        User.update(cond, update, options).exec();
      }
      
      return res.end('ok');
    });
  }
  
  
};
