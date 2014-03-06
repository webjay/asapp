var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(express);

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

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.compress());
app.use(express.favicon());
// app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.methodOverride());
app.use(express.cookieParser());

// if (app.get('env') == 'development') {
//   app.use(express.session());
// } else {
  app.use(express.session({
    store: new MongoStore(dbconf.sessions),
    secret: dbconf.secret
  }));
// }

app.use(app.router);

// development only
if (app.get('env') == 'development') {
  app.use(express.errorHandler());
}

routes.define(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
