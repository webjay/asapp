var mongoose = require('mongoose');
var jsonBody = require('body/json');
var socketeer = require('../lib/socketeer');

// define models hack
require('../models/group');
require('../models/location');
var Status = require('../models/status');
var Activity = require('../models/activity');

var schema = new mongoose.Schema({
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groups'
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

var Request = mongoose.model('requests', schema);

module.exports.all = function (req, res) {
  Request.find().sort('-created').select('-__v').populate(popuptions).exec(function (err, requests) {
    if (err) throw err;
    res.json(requests);
  });
}

module.exports.create = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) return next(err);
    var obj = body;
    obj.user = req.session.user._id;
    obj.created = new Date;
    Status.getDefault(function (err, doc) {
      if (err) return next(err);
      obj.status = doc._id;
      Request.create(obj, function (err, doc) {
        if (err) return next(err);
        Activity.add({
          action: 'created',
          user: req.session.user._id,
          request: doc._id
        });
        Request.findOne(doc).select('-__v').populate(popuptions).exec(function (err, doc) {
          if (err) return next(err);
          res.json(201, doc);
          socketeer.broadcast(req.socketio, 'request add', doc);
        });
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
    Request.findByIdAndUpdate(id, obj).select('-__v').populate(popuptions).exec(function (err, doc) {
      if (err) return next(err);
      res.json(doc);
    });
    var changes = obj;
    delete changes._id;
    Activity.add({
      action: 'updated',
      user: req.session.user._id,
      request: id,
      changes: changes
    });
  });
}

module.exports.delete = function (req, res, next) {
  var conditions = {
    _id: req.params.id,
    user: req.session.user._id
  }
  Activity.add({
    action: 'deleted',
    user: req.session.user._id,
    request: req.params.id
  });
  Request.findOneAndRemove(conditions, function (err) {
    if (err) return next(err);
    res.type('json');
    res.send(204);
  });
}
