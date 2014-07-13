var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    trim: true
  },
  changes: Object,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'requests'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

var Activity = mongoose.model('activity', schema);

module.exports.add = function (action) {
  return Activity.create(action);
}
