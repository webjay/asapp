var HelpView = Backbone.View.extend({

  el: '#help',

  events: {
    'change input': 'modelSet',
    'change select': 'modelSet',
    'change textarea': 'modelSet',
    'click button': 'modelSet',
    'submit form': 'submit'
  },

  initialize: function () {
    this.listenTo(asapp.types, 'sync', this.render);
    this.listenTo(asapp.locations, 'sync', this.render);
  },

  render: function () {
    var self = this;

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

  modelSet: function () {
    this.model.set(this.$('form').serializeObject());
  },

  submit: function (event) {
    event.preventDefault();
    this.modelSet();
    if (this.model.isValid()) {
      this.collection.create(this.model);
      asapp.redirect('monitor');
      this.$('textarea').val('');
      this.model = new this.collection.model;
    }
  }

});
