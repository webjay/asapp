function getCurrentPage () {
  var page = $(':mobile-pagecontainer').pagecontainer('getActivePage');
  return $(page).attr('id');
}


// when jQuery Mobile has finished loading
jQuery(document).on('mobileinit', function(){

  console.log('JQM ready');

  $.extend($.mobile, {
    defaultPageTransition: 'none'
  });
  $.mobile.page.prototype.options.theme = 'b';

  $(document).on('pagecontainerbeforeshow', function (event) {
    if (asapp.user.isSynced() && !asapp.user.id && getCurrentPage() !== 'login') {
      event.preventDefault();
      asapp.redirect('#login');
    }
  });

  $(document).on('pagecontainershow', function () {
    // notify Backbone about our whereabouts
    asapp.router.navigate(getCurrentPage(), {
      trigger: true
    });
  });

});


// global
var asapp = {

  redirect: function (page) {
    $(':mobile-pagecontainer').pagecontainer('change', page);
  }

};

// when DOM has finished loading
jQuery(function ($) {

  console.log('DOM ready');

  Backbone.$ = $;

  asapp.user = new User();
  asapp.requests = new Requests();
  asapp.router = new Router();

  Backbone.history.start({
    pushState: false
  });

});
