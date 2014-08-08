var RequestView = Backbone.View.extend({

  className: 'thumbnail',
  template: JST['_templates/request.hjs'],
  
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var data = this.model.toJSON();
    if (this.model.isNew()) {
      data._id = 0;
      data.created = new Date;
    }
    if (this.model.get('urgent') === false) {
      data.wilcos = this.render_wilcos().$el.html();
    } else {
      data.wilcos = null;
    }
    data.statuses = this.render_statuses().el.outerHTML;
    this.$el.html(this.template(data));
    this.$('.selectpicker').selectpicker();
    return this;
  },

  render_wilcos: function () {
    return new WilcosView({
      model: this.model
    }).render();
  },
  
  render_statuses: function () {
    return new StatusesView({
      model: this.model
    }).render();
  }

});
