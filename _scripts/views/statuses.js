var StatusesView = Backbone.View.extend({

  tagName: 'div',
  className: 'btn-group',

  events: {
    'change input[type="radio"]': 'statusUpdate',
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.statusRefresh);
    this.renderStatuses();
  },

  render: function () {
    return this;
  },

  renderStatuses: function () {
    var self = this;
    asapp.statuses.each(function (model) {
      var view = new StatusView({
        model: model
      }).render();
      view.$('input').attr({
        name: 'status-' + self.model.id
      });
      if (self.model.get('status') && self.model.get('status')._id == model.id) {
        view.$('input').prop('checked', true);
      }
      self.$el.append(view.el);
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
  },

  statusRefresh: function () {
    if (!this.model.get('status')._id) return;
    this.$('input').not('input[value="' + this.model.get('status')._id + '"]').prop('checked', false);
    this.$('input[value="' + this.model.get('status')._id + '"]').prop('checked', true);
  }

});
