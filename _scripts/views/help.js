var HelpView = Backbone.View.extend({

  el: '#help',

  events: {
    'click button': 'modelSet',
    'submit form': 'submit'
  },

  initialize: function () {
    this.listenTo(asapp.types, 'sync', this.render);
    this.listenTo(asapp.locations, 'sync', this.render);
  },

  render: function () {
    var self = this;
    
    this.$('textarea').val('');

    this.$('#request-types > div').empty();
    asapp.types.each(function (model) {
      var view = new TypeView({
        model: model
      }).render();
      self.$('#request-types > div').append(view.el);
    });

    this.$('#request-locations > div').empty();
    asapp.locations.each(function (model) {
      var view = new LocationView({
        model: model
      }).render();
      self.$('#request-locations > div').append(view.el);
    });

    return this;
  },

  modelSet: function (event) {
    if (event) {
      var $el = $(event.currentTarget);
      if ($el.attr('name') == 'urgent') {
        this.model.set('urgent', $el.attr('value'));
      }
    }
    this.model.set(this.$('form').serializeObject());
  },

  submit: function (event) {
    event.preventDefault();
    this.modelSet();
    if (this.model.isValid()) {
      this.collection.create(this.model, {
        wait: true
      });
      this.$('textarea').val('');
      this.model = new this.collection.model;
      asapp.redirect('monitor');
    }
  }

});
