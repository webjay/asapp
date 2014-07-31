var MonitorView = Backbone.View.extend({

  el: '#monitor',

  initialize: function () {
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'add', this.prepend);
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.append, this);
    return this;
  },

  append: function (model) {
    var view = new RequestView({
      model: model
    }).render();
    this.$el.append(view.el);
  },

  prepend: function (model) {
    var view = new RequestView({
      model: model
    }).render();
    this.$el.prepend(view.el);
  }

});
