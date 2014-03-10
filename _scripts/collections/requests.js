
var Requests = Backbone.Collection.extend({

  model: Request,
  url: '/requests',
  el: '#monitor tbody',

  initialize: function () {
    this.$el = $(this.el);
    this.on({
      add: function (model) {
        // create view
        var view = new MonitorView({
          model: model
        });
        this.$el.append(view.render().el);
      }
    }, this);
  }

});
