
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  }
}


// when jQuery Mobile has finished loading
jQuery(document).on('mobileinit', function(){

  console.log('JQM ready');

  $.extend($.mobile, {
    // autoInitializePage: false,
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
  },

  date: function (d) {
    return moment(d).format('h:mm');
  }

};

// when DOM has finished loading
jQuery(function ($) {

  console.log('DOM ready');

  Backbone.$ = $;

  asapp.user = new User();
  asapp.types = new Types();
  asapp.locations = new Locations();
  asapp.statuses = new Statuses();
  asapp.requests = new Requests();
  asapp.router = new Router();
  asapp.views = {};

  asapp.user.on('sync', asapp.preload);
  asapp.user.fetch();

  // $.mobile.initializePage();
  $('header[data-role="header"], footer[data-role="footer"]').toolbar({
    theme: 'b'
  });
  $('nav[data-role="navbar"]').navbar();

  Backbone.history.start({
    pushState: false
  });

  // Pusher
  var pusher = new Pusher('89dd0fd43699d54bb1bf');
  var channel = pusher.subscribe('requests');
  channel.bind('add', function (data) {
    asapp.requests.fetch();
  });

});
