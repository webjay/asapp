var mongoose = require('mongoose');
var jsonBody = require('body/json');
var Pusher = require('pusher');

function push (data) {
  pusher.trigger('messages', 'add', data);
}


var pusher = new Pusher({
  appId: '68298',
  key: '89dd0fd43699d54bb1bf',
  secret: 'e9bd4c33e1d52b195926'
});

var schema = new mongoose.Schema({
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

var Message = mongoose.model('messages', schema);

module.exports.all = function (req, res) {
  var popuptions = [
    {
      path: 'user',
      select: 'username'
    }
  ];
  var select = '-__v';
  Message.find().select(select).sort('-created').populate(popuptions).exec(function (err, messages) {
    if (err) throw err;
    res.json(messages);
  });
}

module.exports.create = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) return next(err);
    var obj = body;
    obj.user = req.session.user._id;
    obj.created = new Date;
    Message.create(obj, function (err, doc) {
      if (err) return next(err);
      res.json(201, doc);
      push(doc);
    });
  });
}

module.exports.update = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) throw err;
    var obj = body;
    var id = obj._id;
    delete obj._id;
    Message.findByIdAndUpdate(id, obj, function (err, doc) {
      if (err) return next(err);
      res.json(doc);
      push(doc);
    });
  });
}

module.exports.delete = function (req, res, next) {
  var conditions = {
    _id: req.params.id,
    user: req.session.user._id
  }
  Message.findOneAndRemove(conditions, function (err) {
    if (err) return next(err);
    res.type('json');
    res.send(204);
  });
}
