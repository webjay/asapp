var StatusView = Backbone.View.extend({

  tagName: 'button',
  className: 'btn btn-default',
  attributes: {
    type: 'button'
  },

  render: function () {
    this.$el.html(this.model.get('name'));
    this.$el.data('id', this.model.get('_id'));
    return this;
  },

});
