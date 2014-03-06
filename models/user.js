var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  username: String
});

module.exports = mongoose.model('users', schema);

module.exports.auth = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.send(401, 'Please login');
  }
}
