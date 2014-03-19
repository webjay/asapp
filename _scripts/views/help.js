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

    this.$('#request-types .ui-controlgroup-controls').empty();
    asapp.types.each(function (model) {
      var view = new TypeView({
        model: model,
        attributes: {
          for: _.uniqueId('sts')
        }
      }).render();
      self.$('#request-types .ui-controlgroup-controls').append(view.el);
    });
    this.$('#request-types .ui-controlgroup-controls').enhanceWithin();

    this.$('#request-locations .ui-controlgroup-controls').empty();
    asapp.locations.each(function (model) {
      var view = new LocationView({
        model: model,
        attributes: {
          for: _.uniqueId('sts')
        }
      }).render();
      self.$('#request-locations .ui-controlgroup-controls').append(view.el);
    });
    this.$('#request-locations .ui-controlgroup-controls').enhanceWithin();

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
      asapp.redirect('#monitor');
      this.$('textarea').val('');
      this.model = new this.collection.model;
    }
  }

});
