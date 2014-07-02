
var Router = Backbone.Router.extend({

  routes: {
    '': 'goto_default',
    'login': 'login',
    'help': 'help',
    'monitor': 'monitor',
    'settings-profile': 'settings_profile',
    'settings-location': 'settings_location',
    'chat': 'chat'
  },

  goto: 'help',
  view_current: null,
  route_ignore: ['goto_default'],

  initialize: function () {
    if (window.location.hash) {
      this.goto = window.location.hash;
    }
    this.on('route', function (route) {
      // check login
      if (route !== 'login' && !asapp.user.has('username')) {
        asapp.redirect('login');
        return;
      }
      if (this.route_ignore.indexOf(route) === -1) {
        // set title
        document.title = 'ASAPP - ' + $('#' + route).data('title');
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

  goto_default: function () {
    asapp.redirect();
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

  settings_profile: function () {},
  settings_location: function () {},

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
