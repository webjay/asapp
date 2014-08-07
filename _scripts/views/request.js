var RequestView = Backbone.View.extend({

  tagName: 'div',
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
    this.$el.html(this.template(data));
    var statusesView = new StatusesView({
      model: this.model
    });
    this.$('.statuses').html(statusesView.render().el);
    this.$('.selectpicker').selectpicker();
    if (this.model.user_wilco()) {
      this.$('.wilco').addClass('active');
    }
    if (this.model.user_is_owner()) {
      this.$('.star').addClass('active');
    }
    return this;
  }

});
