function getCurrentPage () {
  var page = $(':mobile-pagecontainer').pagecontainer('getActivePage');
  return $(page).attr('id');
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  }
}


// when jQuery Mobile has finished loading
jQuery(document).on('mobileinit', function(){

  console.log('JQM ready');

  $.extend($.mobile, {
    autoInitializePage: false,
    defaultPageTransition: 'none'
  });
  $.mobile.page.prototype.options.theme = 'b';

  $(document).on('pagecontainerbeforeshow', function (event) {
    if (asapp.user.isFetched() && !asapp.user.id && getCurrentPage() !== 'login') {
      event.preventDefault();
      asapp.redirect('#login');
    }
  });

  // $(document).on('pagecontainershow', function () {
  //   // notify Backbone about our whereabouts
  //   asapp.router.navigate(getCurrentPage(), {
  //     trigger: true
  //   });
  // });

});


// global
var asapp = {

  redirect: function (page) {
    $(':mobile-pagecontainer').pagecontainer('change', page);
  },

  preload: function () {
    asapp.types.fetch();
    asapp.locations.fetch();
  }

};

// when DOM has finished loading
jQuery(function ($) {

  console.log('DOM ready');

  Backbone.$ = $;

  asapp.user = new User();
  asapp.types = new Types();
  asapp.locations = new Locations();
  asapp.requests = new Requests();
  asapp.router = new Router();
  asapp.views = {};

  asapp.user.on('sync', asapp.preload);
  asapp.user.fetch();

  $.mobile.initializePage();

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
