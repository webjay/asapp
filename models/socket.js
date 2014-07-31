var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  socketid: {
    type: String,
    index: true,
    unique: true
  },
  connected: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  created: {
    type: Date,
    default: Date.now,
    select: false
  }
});

var Socket = mongoose.model('sockets', schema);

module.exports = {
  
  post_update: function (doc) {
    if (!doc.get('connected') && !doc.get('user')) {
      doc.remove();
    }
  },

  set_connected: function (socket_id, connected) {
    var self = this;
    var conditions = {
      socketid: socket_id
    };
    var update = {
      connected: connected
    };
    var options = {
      upsert: true
    };
    Socket.findOneAndUpdate(conditions, update, options, function (err, doc) {
      if (err) throw err;
      self.post_update(doc);
    });
  },

  set_user: function (socket_id, user_id) {
    this.remove_user(user_id, socket_id, function (err) {
      if (err) throw err;
      var conditions = {
        socketid: socket_id
      };
      var update = {
        user: user_id
      };
      Socket.findOneAndUpdate(conditions, update).exec();
    });
  },

  get_disconnected: function (callback) {
    var conditions = {
      connected: false,
      user: { 
        $exists: true 
      }
    };
    var popuptions = [
      {
        path: 'user',
        select: 'username mobile notifications.sms follow'
      }
    ];
    Socket.find(conditions).populate(popuptions).exec(callback);
  },

  remove_socket: function (socket_id) {
    var conditions = {
      socketid: socket_id
    };
    Socket.findOneAndRemove(conditions).exec();
  },

  remove_user: function (user_id, socket_id, callback) {
    var conditions = {
      user: user_id,
      socketid: {
        $ne: socket_id
      }
    };
    Socket.findOneAndRemove(conditions, callback);
  }

}
