
var Requests = Backbone.Collection.extend({

  model: Request,
  url: '/requests',
  el: '#monitor',
  el_tbody: '#monitor tbody',

  initialize: function () {
    this.$el = $(this.el);
    this.$el_tbody = $(this.el_tbody);
    this.on({
      add: function (model) {
        var view = new MonitorView({
          model: model
        }).render();
        this.$el_tbody.append(view.el);
        this.$el.enhanceWithin();
      }
    }, this);
  }

});
