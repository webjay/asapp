
var Router = Backbone.Router.extend({

  routes: {
    '': 'goto_help',
    'login': 'login',
    'help': 'help',
    'monitor': 'monitor',
    'settings': 'settings',
    'chat': 'chat'
  },
  
  view_current: null,
  view_ignore: ['goto_help'],

  initialize: function () {
    this.on('route', function (route) {
      if (this.view_ignore.indexOf(route) === -1) {
        // set active menu item
        $('nav ul li').removeClass('active');
        $('.nav-' + route).addClass('active');
        // toggle view
        $('#' + this.view_current).addClass('hidden');
        this.view_current = route;
        $('#' + route).removeClass('hidden');
      }
    });
  },

  goto_help: function () {
    asapp.redirect('help');
  },

  login: function(){
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
      model: new asapp.requests.model
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

  settings: function () {
    if (asapp.views.settings) {
      asapp.views.settings.stopListening();
    }
    asapp.views.settings = new SettingsView();
    asapp.views.settings.render();
  },

  chat: function () {
    $('#chatmsg').focus();
    if (asapp.views.chat) {
      return;
    }
    asapp.views.chat = new ChatView({
      collection: asapp.messages,
      model: new asapp.messages.model
    });
    asapp.views.chat.render();
  }

});
