var RequestView = Backbone.View.extend({

  className: 'thumbnail',
  template: JST['_templates/request.hjs'],
  
  events: {
    'click .wilco': 'wilco',
    'click .star': 'star'
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
    if (this.model.get('urgent') === false) {
      data.wilcos = this.render_wilcos().$el.html();
    } else {
      data.wilcos = null;
    }
    this.$el.html(this.template(data));
    return this;
  },

  render_wilcos: function () {
    return new WilcosView({
      model: this.model
    }).render();
  },
  
  wilco: function () {
    this.model.save({
      wilco_set: this.model.user_wilco()
    }, {
      patch: true,
      wait: true
    });
  },

  star: function () {
    this.model.save({
      owner: asapp.user.id
    }, {
      patch: true,
      wait: true
    });
  }

});
