var StatusesView = Backbone.View.extend({

  tagName: 'td',
  template: JST['_templates/statuses.hjs'],

  events: {
    'change input[type="radio"]': 'statusUpdate',
  },

  initialize: function () {
    this.subview = new Backbone.View;
    this.renderRdios();
  },

  render: function () {
    this.$el.html(this.template());
    this.$('fieldset').html(this.subview.el);
    return this;
  },

  renderRdios: function () {
    var self = this;
    asapp.statuses.each(function (model) {
      var view = new StatusView({
        model: model,
        attributes: {
          for: _.uniqueId('sts')
        }
      }).render();
      view.$('input').attr({
        name: 'status-' + self.model.id
      });
      if (self.model.get('status') && self.model.get('status')._id == model.id) {
        view.$('input').attr({
          checked: 'checked'
        });
      }
      self.subview.$el.append(view.el);
    });
  },

  statusUpdate: function (event) {
    var $el = $(event.currentTarget);
    if (!$el.prop('checked')) {
      return;
    }
    this.model.save({
      _id: this.model.id,
      status: $el.val()
    }, {
      patch: true,
      validate: false
    });
  }

});
