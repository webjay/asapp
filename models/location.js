var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String
});

var Location = mongoose.model('locations', schema);

module.exports.all = function (req, res) {
  var select = '-__v';
  Location.find().select(select).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
}
