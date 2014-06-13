
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  }
}


// when jQuery Mobile has finished loading
jQuery(document).on('mobileinit', function(){

  console.log('JQM ready');

  $.extend($.mobile, {
    defaultPageTransition: 'none'
  });
  $.mobile.page.prototype.options.theme = 'b';
  $.mobile.page.prototype.options.domCache = true;

  $(document).on('pagecontainerbeforeshow', function (event) {
    if (asapp.user.isFetched() && !asapp.user.id && asapp.getCurrentPage() !== 'login') {
      event.preventDefault();
      asapp.redirect('#login');
    }
  });

});


// global
var asapp = {

  getCurrentPage: function () {
    var page = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    return $(page).attr('id');
  },

  redirect: function (page) {
    $(':mobile-pagecontainer').pagecontainer('change', page);
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
      $.mobile.loading('show');
    },
    ajaxComplete: function(){
      $.mobile.loading('hide');
    }
  });

  $('header[data-role="header"], footer[data-role="footer"]').toolbar({
    theme: 'b'
  });
  $('nav[data-role="navbar"]').navbar();

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
