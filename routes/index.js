var User = require('../models/user');
var Request = require('../models/request');
var Location = require('../models/location');
var Group = require('../models/group');
var Status = require('../models/status');
var Message = require('../models/message');
var Socket = require('../models/socket');
var socketeer = require('../lib/socketeer');

exports.define = function (router, io) {

  io.on('connection', function (socket) {
    console.log('socket.io user connected');
    Socket.set_connected(socket.id, true);
    socket.on('disconnect', function(){
      Socket.set_connected(socket.id, false);
      console.log('socket.io user disconnected');
    });
  });
  
  router.use(function (req, res, next) {
    if (req.xhr) {
      req.socketio = socketeer.get_socket(io, req.headers['socket-id']);
      if (req.socketio.socket) {
        req.session.socketid = req.socketio.socket.id;
        if (req.session.user) {
          Socket.set_user(req.session.socketid, req.session.user._id);
        }
      }
    }
    next();
  });

  router.get('/logout', function (req, res) {
    if (req.session.socketid) {
      Socket.remove_socket(req.session.socketid);
    }
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
    if (req.session.socketid) {
      socket_clear(req.session.socketid);
    }
  });

  router.route('/user/:id')
  .all(User.auth)
  .patch(User.update);

  router.route('/requests').all(User.auth).get(Request.all);

  router.route('/request')
  .all(User.auth)
  .post(Request.create)
  .put(Request.update)
  .patch(Request.update);

  router.route('/request/:id')
  .all(User.auth)
  .delete(Request.delete);

  router.route('/messages').all(User.auth).get(Message.all);

  router.route('/message')
  .all(User.auth)
  .post(Message.create)
  .put(Message.update)
  .patch(Message.update);

  router.route('/message/:id')
  .all(User.auth)
  .delete(Message.delete);

  router.route('/groups').all(User.auth).get(Group.all);
  router.route('/locations').all(User.auth).get(Location.all);
  router.route('/statuses').all(User.auth).get(Status.all);

};
