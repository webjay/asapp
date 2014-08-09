var RequestView = Backbone.View.extend({

  className: 'thumbnail',
  template: JST['_templates/request.hjs'],
  
  events: {
    'click .wilco': 'wilco',
    'click .star': 'star',
    'click [data-action="close"]': 'close',
    'click [data-action="open"]': 'open'
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
    data.user_is_owner = this.model.user_is_owner();
    data.user_wilco = this.model.user_wilco();
    this.$el.html(this.template(data));
    if (this.model.get('open') === false) {
      this.$('.btn').not('[data-action="open"],.btn-chat').prop('disabled', true).addClass('disabled');
    }
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
  },
  
  open: function () {
    this.model.save({
      open: true
    }, {
      patch: true,
      wait: true
    });
  },
  
  close: function () {
    this.model.save({
      open: false
    }, {
      patch: true,
      wait: true
    });
  }

});
