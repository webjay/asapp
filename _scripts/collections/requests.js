
var Requests = Backbone.Collection.extend({

  model: Request,
  url: '/requests',
  el: '#page-monitor',

  initialize: function () {
    var self = this;
    this.on('add', function (model) {
      var view = new MonitorView({
        model: model,
        collection: self
      });
      $(self.el).find('tbody').append(view.render().el);
    });
  }

});
