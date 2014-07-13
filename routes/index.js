var User = require('../models/user');
var Request = require('../models/request');
var Location = require('../models/location');
var Type = require('../models/type');
var Status = require('../models/status');
var Message = require('../models/message');

function socket (io, socket_id) {
  var socket = null;
  for (var i = io.sockets.sockets.length - 1; i >= 0; i--) {
    if (io.sockets.sockets[i].id == socket_id) {
      socket = io.sockets.sockets[i];
      break;
    }
  }
  return socket;
}

exports.define = function (router, io) {

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
  .all(function (req, res, next) {
    req.socketio = socket(io, req.headers['socket-id']);
    next();
  })
  .post(Request.create)
  .put(Request.update)
  .patch(Request.update);

  router.route('/request/:id')
  .all(User.auth)
  .delete(Request.delete);

  router.route('/messages').all(User.auth).get(Message.all);

  router.route('/message')
  .all(User.auth)
  .all(function (req, res, next) {
    req.socketio = socket(io, req.headers['socket-id']);
    next();
  })
  .post(Message.create)
  .put(Message.update)
  .patch(Message.update);

  router.route('/message/:id')
  .all(User.auth)
  .delete(Message.delete);

  router.route('/types').all(User.auth).get(Type.all);
  router.route('/locations').all(User.auth).get(Location.all);
  router.route('/statuses').all(User.auth).get(Status.all);

};
