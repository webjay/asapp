var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String
});

var Group = mongoose.model('groups', schema);

module.exports.all = function (req, res) {
  Group.find().select('-__v').exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
}
