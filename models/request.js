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
    ref: 'users',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groups',
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'locations',
    required: true
  },
  urgent: Boolean,
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'status',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  wilco: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
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
  },
  {
    path: 'wilco',
    select: 'username'
  },
  {
    path: 'owner',
    select: 'username'
  },
];

var Request = mongoose.model('requests', schema);

module.exports.all = function (req, res) {
  var cond = null;
  var groups = req.session.user.groups;
  groups = groups.concat(req.session.user.follow.groups);
  if (req.session.user.admin !== true) {
    cond = {
      group: {
        $in: groups
      },
      location: {
        $in: req.session.user.follow.locations
      }
    };
  }
  Request.find(cond).sort('-created').select('-__v').populate(popuptions).exec(function (err, requests) {
    if (err) throw err;
    res.json(requests);
  });
}

module.exports.create = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) return next(err);
    var obj = body;
    obj.user = req.session.user._id;
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
          res.json(doc);
          socketeer.broadcast(req.socketio, 'request add', doc);
        });
      });
    });
  });
}

module.exports.update = function (req, res, next) {
  jsonBody(req, res, function (err, body) {
    if (err) return next(err);
    var obj = body;
    var id = req.params.id
    delete obj._id;
    delete obj.user;
    delete obj.created;
    delete obj.wilco;
    if (obj.wilco_set === false) {
      obj.$addToSet = {
        'wilco': req.session.user._id
      }
    } else if (obj.wilco_set === true) {
      obj.$pull = {
        'wilco': req.session.user._id
      }
    }
    delete obj.wilco_set;
    Request.findByIdAndUpdate(id, obj).populate(popuptions).exec(function (err, doc) {
      if (err) return next(err);
      res.json(doc);
      socketeer.broadcast(req.socketio, 'request update', doc);
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
