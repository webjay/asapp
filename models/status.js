var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  fyi: Boolean,
  urgent: Boolean,
  action: String
});

var Status = mongoose.model('status', schema);

module.exports.all = function (req, res) {
  var select = '-__v';
  Status.find().select(select).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
}

module.exports.getDefault = function (callback) {
  Status.findOne({}, callback);
}
