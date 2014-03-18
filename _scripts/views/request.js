var RequestView = Backbone.View.extend({

  tagName: 'tr',
  template: JST['_templates/request.hjs'],

  className: function () {
    return this.model.get('urgent') ? 'urgent' : '';
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
