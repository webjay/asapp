var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String
});

var Type = mongoose.model('types', schema);

module.exports.all = function (req, res) {
  var select = '-__v';
  Type.find().select(select).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
}
