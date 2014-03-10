
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
    var view = new RequestView({
      collection: asapp.requests,
      model: new asapp.requests.model()
    });
    view.render();
  },

  monitor: function(){
    asapp.requests.fetch();
  },

  settings: function(){
    var view = new ProfileView();
    view.render();
  }

});
