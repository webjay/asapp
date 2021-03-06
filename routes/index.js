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
      console.log('socket.io user disconnected');
      Socket.set_connected(socket.id, false);
    });
  });
  
  router.use(function (req, res, next) {
    if (req.xhr && req.headers['socket-id']) {
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
    res.json(req.session.user);
    if (req.session.socketid) {
      Socket.set_user(req.session.socketid, req.session.user._id);
    }
  });

  router.route('/user/:id')
  .all(User.auth)
  .get(User.get)
  .put(User.put)
  .patch(User.update);

  router.route('/requests').all(User.auth).get(Request.all);

  router.route('/requests')
  .all(User.auth)
  .post(Request.create)

  router.route('/requests/:id')
  .all(User.auth)
  .patch(Request.update)
  // .delete(Request.delete);

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

  // Admin

  router.use('/admin/*', User.admin.auth);

  router.route('/admin/users')
  .get(User.admin.all)
  .post(User.admin.update);

};
