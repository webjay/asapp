var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  socketid: {
    type: String,
    index: true,
    unique: true
  },
  connected: {
    type: Boolean,
    default: true,
    select: false
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

  set_connected: function (id, connected) {
    var conditions = {
      socketid: id
    };
    var update = {
      connected: connected
    };
    var options = {
      upsert: true
    };
    Socket.findOneAndUpdate(conditions, update, options, function (err) {
      if (err) {
        console.error(err);
      }
    });
  },

  set_user: function (id, user_id) {
    this.remove_user(user_id, function (err) {
      if (err) throw err;
      var conditions = {
        socketid: id
      };
      var update = {
        user: user_id
      };
      Socket.findOneAndUpdate(conditions, update, function (err) {
        if (err) throw err;
      });
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
        select: 'username mobile'
      }
    ];
    Socket.find(conditions).populate(popuptions).exec(callback);
  },

  remove_socket: function (id) {
    var conditions = {
      socketid: id
    };
    Socket.findOneAndRemove(conditions, function (err) {
      if (err) {
        console.error(err);
      }
    });
  },

  remove_user: function (id, callback) {
    var conditions = {
      user: id
    };
    Socket.findOneAndRemove(conditions, callback);
  }

}
