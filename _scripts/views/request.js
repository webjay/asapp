var RequestView = Backbone.View.extend({

  el: '#request',

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

    asapp.types.each(function (model) {
      var view = new TypeView({
        model: model
      }).render();
      self.$el.find('#request-types').append(view.el);
    });

    asapp.locations.each(function (model) {
      var view = new LocationView({
        model: model
      }).render();
      self.$el.find('#request-locations').append(view.el);
    });

    this.$el.trigger('create');

    return this;
  },

  modelSet: function (event) {
    var el = $(event.currentTarget);
    var data = {}
    data[el.attr('name')] = el.val();
    this.model.set(data);
  },

  submit: function (event) {
    event.preventDefault();
    this.collection.add(this.model);
    asapp.redirect('#monitor');
  }

});
