var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String
});

var Group = mongoose.model('groups', schema);

module.exports.all = function (req, res) {
  var cond = null;
  if (req.session.user.admin !== true) {
    cond = {
      _id: {
        $in: req.session.user.groups
      }
    };
  }
  Group.find(cond).select('-__v').exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
}
