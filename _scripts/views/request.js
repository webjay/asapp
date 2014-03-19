var RequestView = Backbone.View.extend({

  tagName: 'tr',
  template: JST['_templates/request.hjs'],

  className: function () {
    return this.model.get('urgent') ? 'urgent' : '';
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.statusView = new StatusesView({
      model: this.model
    });
    this.statusView.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    this.$el.append(this.statusView.el);
    this.$el.enhanceWithin();
    return this;
  }

});
