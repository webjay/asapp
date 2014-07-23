var HelpView = Backbone.View.extend({

  el: '#help',

  events: {
    'click button': 'modelSet',
    'submit form': 'submit'
  },

  initialize: function () {
    this.listenTo(asapp.groups, 'sync', this.render);
    this.listenTo(asapp.locations, 'sync', this.render);
  },

  render: function () {
    var self = this;
    
    this.$('textarea').val('');

    this.$('#request-types > div').empty();
    asapp.groups.each(function (model) {
      var view = new GroupView({
        model: model
      }).render();
      self.$('#request-groups > div').append(view.el);
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
        wait: false
      });
      this.$('textarea').val('');
      this.model = new this.collection.model;
      asapp.redirect('monitor');
    }
  }

});
