var MonitorView = Backbone.View.extend({

  el: '#monitor',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var tbody = this.$('tbody');
    tbody.empty();
    this.collection.each(function (model) {
      var view = new RequestView({
        model: model
      }).render();
      tbody.append(view.el);
    });
    this.$el.enhanceWithin();
    return this;
  }

});
