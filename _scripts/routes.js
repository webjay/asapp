
var Router = Backbone.Router.extend({

  routes: {
    '': 'redirect',
    'login': 'login',
    'request': 'request',
    'monitor': 'monitor',
    'settings': 'settings'
  },

  initialize: function () {
    this.bind('route', function (route) {
      // after BB view rendering, rerender JQM
      // $(':mobile-pagecontainer').pagecontainer('getActivePage').trigger('create');
      $('#' + route).trigger('create');
      // set active menu
      console.log(route);
    });
  },

  redirect: function () {
    asapp.redirect('#request');
  },

  login: function(){
    if (asapp.views.login) {
      asapp.views.login.remove();
    }
    asapp.views.login = new LoginView({
      model: asapp.user
    });
    asapp.views.login.render();
  },

  request: function () {
    if (asapp.views.request) {
      // asapp.views.request.remove();
      // asapp.views.request.$el.trigger('create');
      return;
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
