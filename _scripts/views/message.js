var MessageView = Backbone.View.extend({

  tagName: 'tr',
  template: JST['_templates/message.hjs'],

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
