var mongoose = require('mongoose');
var jsonBody = require('body/json');
var Pusher = require('pusher');

// define models hack
require('../models/type');
require('../models/location');
require('../models/status');


var pusher = new Pusher({
  appId: '68298',
  key: '89dd0fd43699d54bb1bf',
  secret: 'e9bd4c33e1d52b195926'
});

function push (data) {
  pusher.trigger('requests', 'add', data);
}


var schema = new mongoose.Schema({
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'types'
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'locations'
  },
  urgent: Boolean,
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'status'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

var Request = mongoose.model('requests', schema);
// module.exports = Request;

module.exports.all = function (req, res) {
  var popuptions = [
    {
      path: 'user',
      select: 'username'
    },
    {
      path: 'type',
      select: 'name'
    },
    {
      path: 'location',
      select: 'name'
    },
    {
      path: 'status',
      select: 'name'
    }
  ];
  var select = '-__v';
  Request.find().select(select).populate(popuptions).exec(function (err, requests) {
    if (err) throw err;
    res.json(requests);
  });
}

module.exports.create = function (req, res) {
  jsonBody(req, res, function (err, body) {
    if (err) throw err;
    var obj = body;
    obj.user = req.session.user._id;
    Request.create(obj, function (err, doc) {
      if (err) throw err;
      res.json(doc);
      push(doc);
    });
  });
}

module.exports.update = function (req, res) {
  res.end();
  /*
  jsonBody(req, res, function (err, body) {
    if (err) throw err;
    var obj = body;
    var id = obj._id;
    delete obj._id;
    Request.findByIdAndUpdate(id, obj, function (err, doc) {
      if (err) {
        throw err;
        res.end('Database error');
      } else {
        res.json(doc);
        push(doc);
      }
    });
  });
  */
}
