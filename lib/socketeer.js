var Socket = require('../models/socket');
var twilio = require('./twil');

function sendSms (event, data) {
  var group = data.get('group');
  var location = data.get('location');
  var message = 'Asapp: ' + event + '\n';
  message += 'Group: ' + data.get('group').name + '\n';
  message += 'Location: ' + data.get('location').name + '\n';
  message += 'Description: ' + data.get('description') + '\n';
  Socket.get_disconnected(function (err, docs) {
    for (var i = docs.length - 1; i >= 0; i--) {
      var user = docs[i].get('user');
      if (user.get('notifications').sms === false) {
        continue;
      }
      if (user.get('follow').groups.indexOf(group._id) === -1) {
        continue;
      }
      if (user.get('follow').locations.indexOf(location._id) === -1) {
        continue;
      }
      twilio.sendSms(user.get('mobile'), message);
    }
  });
}

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
    if (event === 'request add') {
      sendSms(event, data);
    }
  }

}