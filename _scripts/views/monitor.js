var MonitorView = Backbone.View.extend({

  el: '#monitor',

  initialize: function () {
    this.$tbody = this.$('tbody');
    this.listenToOnce(this.collection, 'sync', function () {
      this.render();
      this.listenTo(this.collection, 'add', this.prepend);
    });
  },

  render: function () {
    this.$tbody.empty();
    this.collection.each(this.append, this);
    return this;
  },

  append: function (model) {
    var view = new RequestView({
      model: model
    }).render();
    this.$tbody.append(view.el);
  },

  prepend: function (model) {
    var view = new RequestView({
      model: model
    }).render();
    this.$tbody.prepend(view.el);
  }

});
