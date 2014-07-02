
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  }
}


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

  preload: function () {
    asapp.types.fetch();
    asapp.locations.fetch();
    asapp.statuses.fetch();
    asapp.requests.fetch();
    asapp.messages.fetch();
  },

  date: function (d) {
    return moment(d).format('h:mm');
  }

};

// when DOM has finished loading
jQuery(function ($) {

  console.log('DOM ready');

  $(document).on({
    ajaxStart: function(){
      // $.mobile.loading('show');
    },
    ajaxComplete: function(){
      // $.mobile.loading('hide');
    }
  });

  Backbone.$ = $;

  asapp.user = new User();
  asapp.types = new Types();
  asapp.locations = new Locations();
  asapp.statuses = new Statuses();
  asapp.requests = new Requests();
  asapp.messages = new Messages();
  asapp.router = new Router();
  asapp.views = {};

  asapp.user.on('sync', asapp.preload);
  asapp.user.fetch();

  Backbone.history.start({
    pushState: false
  });

  // Pusher
  return;
  var pusher = new Pusher('89dd0fd43699d54bb1bf');
  var channel1 = pusher.subscribe('requests');
  channel1.bind('add', function (data) {
    asapp.requests.fetch();
  });
  var channel2 = pusher.subscribe('messages');
  channel2.bind('add', function (data) {
    asapp.messages.fetch();
  });

});
