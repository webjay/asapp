
var Router = Backbone.Router.extend({

  routes: {
    'login': 'login',
    'request': 'request',
    'monitor': 'monitor',
    'settings': 'settings'
  },

  initialize: function () {
    this.bind('all', function (route) {
      // after BB view rendering, rerender JQM
      $(':mobile-pagecontainer').pagecontainer('getActivePage').trigger('create');
    });
  },

  login: function(){
    (new LoginView()).render();
  },

  request: function () {
    if (asapp.views.request) {
      asapp.views.request.remove();
    }
    asapp.views.request = new RequestView({
      collection: asapp.requests,
      model: new asapp.requests.model()
    });
    asapp.views.request.render();
  },

  monitor: function () {
    asapp.requests.fetch();
  },

  settings: function () {
    var view = new ProfileView();
    view.render();
  }

});
