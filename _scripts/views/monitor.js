var MonitorView = Backbone.View.extend({

  tagName: 'tr',
  template: JST['_templates/monitor-item.jst'],

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
