
// when jQuery Mobile has finished loading
jQuery(document).on('mobileinit', function(){

  $(document).on('pagebeforeshow', function(){
    asapp.router.navigate(document.location.pathname, {
      trigger: true, 
      replace: true
    });
    // rerender
    var page = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    page.trigger('create');
  });

});


// global
var asapp = {};

// when DOM has finished loading
jQuery(function ($) {
  
  Backbone.$ = $;
  
  asapp.user = new User();
  asapp.requests = new Requests();
  asapp.router = new Router();
  
  Backbone.history.start({
    pushState: true
  });
  
});
