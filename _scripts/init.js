
// global
var asapp = {
  
  redirect: function (route) {
    // if (route == 'login') {
    //   window.location = '/#' + route;
    //   return;
    // }
    if (!route) {
      route = asapp.router.goto;
    }
    asapp.router.navigate(route, {
      trigger: true
    });
  },

  preload: function (callback) {
    var collections = [asapp.groups, asapp.locations, asapp.statuses, asapp.requests, asapp.messages];
    whenAll(collections, 'sync', callback);
    for (var i = collections.length - 1; i >= 0; i--) {
      collections[i].fetch();
    }
  },

  date: function (d) {
    return moment(d).format('h:mm');
  }

};

// when DOM has finished loading
jQuery(function ($) {
  
  // $(document).on({
  //   ajaxStart: function(){
  //     // $.mobile.loading('show');
  //   },
  //   ajaxComplete: function(){
  //     // $.mobile.loading('hide');
  //   }
  // });

  Backbone.$ = $;

  asapp.user = new User();
  asapp.groups = new Groups();
  asapp.locations = new Locations();
  asapp.statuses = new Statuses();
  asapp.requests = new Requests();
  asapp.messages = new Messages();
  asapp.router = new Router();
  asapp.views = {};

  asapp.user.on('sync', function () {
    asapp.preload(function () {
      Backbone.history.start();
    });
  });
  asapp.user.fetch();

  // Socket.io
  var socket = io();
  socket.on('connect', function(){
    $(document).ajaxSend(function (event, request, settings) {
      request.setRequestHeader('socket-id', socket.io.engine.id);
    });
  });
  socket.on('disconnect', function(){
    var message = 'We seem to have lost connection to the server, would you like to try a reconnect?';
    if (window.confirm(message)) {
      window.location = '/';
    }
  });
  socket.on('request add', function (obj) {
    asapp.requests.add(obj);
  });
  socket.on('request update', function (obj) {
    asapp.requests.add(obj, {
      merge: true
    });
  });
  socket.on('message add', function (obj) {
    asapp.messages.add(obj);
  });

});
