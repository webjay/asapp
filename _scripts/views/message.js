var MessageView = Backbone.View.extend({

  tagName: 'div',
  className: 'list-group-item msg',
  template: JST['_templates/message.hjs'],
  
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
