var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
// var MongoStore = require('connect-mongo')(express);
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('static-favicon');

var dbconf = {
  mongoose: {
    url: 'mongodb://asapp:loveBoat@troup.mongohq.com:10041/asapp',
    auto_reconnect: true
  },
  sessions: {
    url: 'mongodb://asapp:loveBoat@troup.mongohq.com:10041/asapp',
    auto_reconnect: true
  },
  secret: 'go with the waves'
};

mongoose.connect(dbconf.mongoose.url);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compress());
app.use(favicon('public/favicon.ico'));
app.use(express.static(__dirname + '/public'));

// if (app.get('env') == 'development') {
//   app.use(express.session());
// } else {
  // app.use(express.session({
  //   store: new MongoStore(dbconf.sessions),
  //   secret: dbconf.secret
  // }));
// }

app.use(cookieParser());
app.use(expressSession({
  secret: dbconf.secret
}));

var router = express.Router();
routes.define(router);
app.use(router);

app.listen(app.get('port'));
