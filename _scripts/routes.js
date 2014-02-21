
var Router = Backbone.Router.extend({

  routes: {
    '': 'settings',
    'index.html': 'request',
    'monitor.html': 'monitor',
    'settings.html': 'settings',
    '*path': 'settings'
  },
  
  request: function(){
    var view = new RequestView();
    view.render();
  },

  monitor: function(){
    page = '#page-monitor';
    // var open = asapp.requests.where({
    //   urgent: true
    // });
    var open = asapp.requests.models;
    console.log(open);
    $.each(open, function (index, model) {
      var view = new MonitorView({
        model: model
      });
      $(page).find('tbody').append(view.render().el);
    });
  },

  settings: function(){
    var view = new ProfileView();
    view.render();
  }

});
