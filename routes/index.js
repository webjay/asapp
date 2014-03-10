var User = require('../models/user');
var Request = require('../models/request');
var Location = require('../models/location');
var Type = require('../models/type');

exports.define = function (app) {

  // app.get('/', function (req, res) {
  //   if (req.session.user) {
  //     res.redirect('/#request');
  //   } else {
  //     res.redirect('/#login');
  //   }
  // });

  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
  });

  app.get('/user', function (req, res) {
    res.json(req.session.user);
  });

  app.post('/user', function (req, res) {
    var cond = {
      username: req.body.username
    }
    User.findOne(cond, function (err, user) {
      if (err) throw err;
      req.session.user = user;
      res.json(user);
    });
  });

  app.get('/requests', User.auth, Request.all);
  app.post('/request', User.auth, Request.create);
  app.put('/request', User.auth, function (req, res) {
    res.end();
  });

  app.get('/locations', User.auth, Location.all);
  app.get('/types', User.auth, Type.all);

};
