var Socket = require('../models/socket');
var twilio = require('./twil');

module.exports = {

  get_socket: function (io, socket_id) {
    var socket = null;
    for (var i = io.sockets.sockets.length - 1; i >= 0; i--) {
      if (io.sockets.sockets[i].id == socket_id) {
        socket = io.sockets.sockets[i];
        break;
      }
    }
    return {
      io: io,
      socket: socket
    };
  },
  
  broadcast: function (sio, event, data) {
    if (sio.socket.connected) {
      sio.socket.broadcast.emit(event, data);
    } else {
      sio.io.emit(event, data);
    }
    Socket.get_disconnected(function (err, docs) {
      for (var i = docs.length - 1; i >= 0; i--) {
        var user = docs[i].get('user');
        var message = 'Asapp says: ' + event;
        twilio.sendSms(user.get('mobile'), message);
      }
      // console.log(docs);
    });
  }

}