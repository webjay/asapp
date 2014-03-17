var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('static-favicon');

var dbconf = {
  url: 'mongodb://asapp:loveBoat@troup.mongohq.com:10041/asapp',
  secret: 'go with the waves'
};

mongoose.connect(dbconf.url, {
  auto_reconnect: true
});
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', function (err) {
  console.error(err);
});

var app = express();
module.exports = app;

app.set('port', process.env.PORT || 3000);

if (app.get('env') == 'development') {
  var logger = require('morgan');
  app.use(logger());
}

app.use(compress());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(expressSession({
  secret: dbconf.secret
}));

var router = express.Router();
routes.define(router);
app.use(router);

app.listen(app.get('port'));
console.log('Express listening on port %d', app.get('port'));
