
// global
var asapp = {
  
  redirect: function (route) {
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

  $(document).on({
    ajaxStart: function () {
      $('#ajaxloader').show();
    },
    ajaxComplete: function () {
      $('#ajaxloader').hide();
    }
  });
  
  $('.hidden').hide().removeClass('hidden');

  Backbone.$ = $;

  asapp.socketHasDisconnected = false;
  asapp.user = new User();
  asapp.groups = new Groups();
  asapp.locations = new Locations();
  asapp.statuses = new Statuses();
  asapp.requests = new Requests();
  asapp.messages = new Messages();
  asapp.router = new Router();
  asapp.views = {};
  
  // this happens if the user isnt logged in
  asapp.user.on('error', function () { 
    if (Backbone.History.started === false) {
      Backbone.history.start();
    }
  });

  asapp.user.on('sync', function () {
    asapp.preload(function () {
      if (Backbone.History.started === false) {
        Backbone.history.start();
      } else {
        asapp.redirect(window.location.hash);
      }
    });
  });
  asapp.user.fetch();

  // Socket.io
  var socket = io();
  socket.on('connect', function () {
    $('#connerr').hide();
    if (asapp.socketHasDisconnected) {
      asapp.socketHasDisconnected = false;
      asapp.user.fetch();
    }
    $(document).ajaxSend(function (event, request, settings) {
      request.setRequestHeader('socket-id', socket.io.engine.id);
    });
  });
  socket.on('disconnect', function () {
    asapp.socketHasDisconnected = true;
    $('#connerr').show();
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
