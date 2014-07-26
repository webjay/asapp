var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');

var opbeat = require('opbeat'); 
var opbeat_client = opbeat.createClient({ 
  organization_id: '49efe7c522234909a3dce43d20dc76ff',
  app_id: '3706f3bfea',
  secret_token: '93233cf8840e10a2988cc4af51e9aa885bcc01ca'
});

var dbconf = {
  url: process.env.MONGOURL || 'mongodb://mongo:bongo@kahana.mongohq.com:10064/asapp_dev',
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

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);

app.use(compress());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(expressSession({
  secret: dbconf.secret
}));

var router = express.Router();
routes.define(router, io);
app.use(router);

app.use(function (err, req, res, next) {
  // res.json(500, { error: err });
  console.error(err);
  if (!(err instanceof Error)) {
    err = new Error(err);
  }
  opbeat_client.captureError(err, function (opbeatErr, url) {
    if (opbeatErr) return console.error(opbeatErr);
    console.log('The error can be found on:', url);
  });
});

server.listen(app.get('port'));
console.log('Express listening on port %d', app.get('port'));
