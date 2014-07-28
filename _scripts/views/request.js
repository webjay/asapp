var RequestView = Backbone.View.extend({

  tagName: 'div',
  className: 'thumbnail',
  template: JST['_templates/request.hjs'],

  events: {
    'click button.wilco': 'wilco'
  },

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
    statusesView.render();
    this.$('.btn-toolbar').append(statusesView.el);
    if (this.model.user_wilco()) {
      this.$('.wilco').addClass('active');
    }
    return this;
  },
  
  wilco: function () {
    this.model.save({
      wilco_set: this.model.user_wilco()
    }, {
      patch: true,
      wait: true
    });
  }

});
