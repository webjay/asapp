var mongoose = require('mongoose');
var jsonBody = require('body/json');

// define models hack
require('../models/type');
require('../models/location');
require('../models/status');

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
module.exports = Request;

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
    obj = body;
    obj.user = req.session.user._id;
    if (obj._id) {
      var id = obj._id;
      delete obj._id;
    } else {
      var id = new mongoose.Types.ObjectId;
    }
    var options = {
      upsert: true
    };
    Request.findByIdAndUpdate(id, obj, options, function (err, model) {
      if (err) {
        throw err;
        res.end('Database error');
      } else {
        res.json(model);
      }
    });
  });
}

module.exports.update = function (req, res) {
  res.end();
}
