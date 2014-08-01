
var Router = Backbone.Router.extend({

  routes: {
    '': 'goto_default',
    'login': 'login',
    'help': 'help',
    'monitor': 'monitor',
    'settings-profile': 'settings_profile',
    'settings-location': 'settings_location',
    'chat': 'chat',
    'chat/:id': 'chat',
    'admin': 'admin'
  },

  goto: 'help',
  view_current: null,
  route_ignore: ['goto_default'],

  initialize: function () {
    if (window.location.hash) {
      this.goto = window.location.hash;
    }
    this.on('route', this.route_handler);
  },
  
  route_handler: function (route) {
    // check login
    if (route !== 'login' && !asapp.user.has('username')) {
      asapp.redirect('login');
      return;
    }
    if (route === 'login' && asapp.user.has('username')) {
      asapp.redirect();
      return;
    }
    if (this.route_ignore.indexOf(route) === -1) {
      // set title
      document.title = 'ASAPP - ' + $('#' + route).data('title');
      // set active menu item
      $('nav ul li').removeClass('active');
      $('.nav-' + route).addClass('active');
      // toggle view
      $('#' + this.view_current).hide();
      this.view_current = route;
      $('#' + route).show();
    }
  },

  goto_default: function () {
    asapp.redirect();
  },

  login: function () {
    if (asapp.user.id) {
      this.goto_default();
    }
    if (asapp.views.login) {
      asapp.views.login.stopListening();
    }
    asapp.views.login = new LoginView({
      model: asapp.user
    });
    asapp.views.login.render();
  },

  help: function () {
    if (asapp.views.help) {
      return;
    }
    asapp.views.help = new HelpView({
      collection: asapp.requests,
      model: new Request()
    });
    asapp.views.help.render();
  },

  monitor: function () {
    if (asapp.views.monitor) {
      return;
    }
    asapp.views.monitor = new MonitorView({
      collection: asapp.requests
    });
    asapp.views.monitor.render();
  },

  settings_profile: function () {
    if (asapp.views.settings_profile) {
      return;
    }
    asapp.views.settings_profile = new SettingsProfileView({
      model: asapp.user
    }).render();
  },
  settings_location: null,

  chat: function (id) {
    $('#chatmsg').focus();
    if (asapp.views.chat) {
      asapp.views.chat.request_id = id;
      asapp.views.chat.render();
      return;
    }
    asapp.views.chat = new ChatView({
      collection: asapp.messages,
      model: new asapp.messages.model
    });
    asapp.views.chat.request_id = id;
    asapp.views.chat.render();
  },

  admin: function () {
    new AdminView({
      collection: new Users()
    });
  }

});
