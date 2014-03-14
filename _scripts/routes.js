
var Router = Backbone.Router.extend({

  routes: {
    '': 'redirect',
    'login': 'login',
    'request': 'request',
    'monitor': 'monitor',
    'settings': 'settings'
  },

  initialize: function () {
    this.on('route', function (route) {
      // set active menu
      $('nav ul li a').removeClass('ui-btn-active');
      $('.nav-' + route).addClass('ui-btn-active');
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
    if (!asapp.views.request) {
      asapp.views.request = new RequestView({
        collection: asapp.requests,
        model: new asapp.requests.model()
      });
    }
    asapp.views.request.render();
  },

  monitor: function () {
    asapp.requests.fetch();
  },

  settings: function () {
    var view = new SettingsView();
    view.render();
  }

});
