var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var RedisStore = require('connect-redis')(expressSession);

if (!process.env.MONGOURL) {
  process.env.MONGOURL = 'mongodb://mongo:bongo@kahana.mongohq.com:10064/asapp_dev';
}
if (!process.env.REDISURL) {
  process.env.REDISURL = 'redis://redistogo:4ed22edd83010041cc2d4dddf93c659f@hoki.redistogo.com:9267/';
}

var opbeat = require('opbeat'); 
var opbeat_client = opbeat.createClient({ 
  organization_id: '49efe7c522234909a3dce43d20dc76ff',
  app_id: '3706f3bfea',
  secret_token: '93233cf8840e10a2988cc4af51e9aa885bcc01ca'
});

var dbconf = {
  url: process.env.MONGOURL,
  secret: 'go with the waves',
  ttl: 10 * 60 * 60,
  options: {
    server: {
      socketOptions: { 
        keepAlive: 1
      }
    },
    replset: {
      socketOptions: { 
        keepAlive: 1
      }
    }
  }
};

mongoose.connect(dbconf.url, dbconf.options);
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
  secret: dbconf.secret,
  cookie: {
    maxAge: dbconf.ttl * 1000
  },
  rolling: true,
  store: new RedisStore({
    url: process.env.REDISURL,
    ttl: dbconf.ttl
  })
}));

var router = express.Router();
routes.define(router, io);
app.use(router);

app.use(function (err, req, res, next) {
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
