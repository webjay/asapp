
// when jQuery Mobile has finished loading
jQuery(document).on('mobileinit', function(){

  console.log('JQM ready');

  $(document).on('pagecontainerbeforeshow', function (event) {
    if (asapp.user.isSynced() && !asapp.user.id && document.location.pathname !== '/login.html') {
      event.preventDefault();
      asapp.redirect('/login.html');
    }
  });

  $(document).on('pagecontainershow', function () {
    // notify Backbone about our whereabouts
    asapp.router.navigate(document.location.pathname, {
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
    pushState: true
  });

});
