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

    this.$('#request-types .ui-controlgroup-controls').empty();
    asapp.types.each(function (model) {
      var view = new TypeView({
        model: model
      }).render();
      self.$('#request-types .ui-controlgroup-controls').append(view.el);
    });
    this.$('#request-types .ui-controlgroup-controls').enhanceWithin();

    this.$('#request-locations .ui-controlgroup-controls').empty();
    asapp.locations.each(function (model) {
      var view = new LocationView({
        model: model
      }).render();
      self.$('#request-locations .ui-controlgroup-controls').append(view.el);
    });
    this.$('#request-locations .ui-controlgroup-controls').enhanceWithin();

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
    this.$('form')[0].reset();
    this.collection.add(this.model);
    asapp.redirect('#monitor');
  }

});
