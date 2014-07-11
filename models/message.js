var mongoose = require('mongoose');
var jsonBody = require('body/json');

function push (io, data) {
  io.emit('message add', data);
}

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

var popuptions = [
  {
    path: 'user',
    select: 'username'
  }
];

module.exports.all = function (req, res) {
  Message.find().sort('-created').select('-__v').populate(popuptions).exec(function (err, messages) {
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
      Message.findOne(doc).select('-__v').populate(popuptions).exec(function (err, doc) {
        if (err) return next(err);
        res.json(201, doc);
        push(req.io, doc);
      });
    });
  });
}

module.exports.update = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) throw err;
    var obj = body;
    var id = obj._id;
    delete obj._id;
    Message.findByIdAndUpdate(id, obj).select('-__v').populate(popuptions).exec(function (err, doc) {
      if (err) return next(err);
      res.json(doc);
      push(req.io, doc);
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
