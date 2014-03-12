var User = require('../models/user');
var Request = require('../models/request');
var Location = require('../models/location');
var Type = require('../models/type');

exports.define = function (router) {

  router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
  });

  router.route('/user')
  .get(function (req, res) {
    res.json(req.session.user);
  })
  .post(User.login)
  .post(function (req, res) {
    req.session.user = req.user;
    res.json(req.session.user);
  });

  router.route('/requests').all(User.auth).get(Request.all);

  router.route('/request')
  .all(User.auth)
  .post(Request.create)
  .put(Request.update);

  router.route('/types').all(User.auth).get(Type.all);
  router.route('/locations').all(User.auth).get(Location.all);

};
