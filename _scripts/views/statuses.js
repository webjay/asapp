var StatusesView = Backbone.View.extend({

  tagName: 'div',
  className: 'btn-group btn-group-sm',

  events: {
    'click button': 'statusUpdate',
  },

  render: function () {
    var self = this;
    self.$el.empty();
    asapp.statuses.each(function (model) {
      var view = new StatusView({
        model: model
      }).render();
      if (self.model.get('status') && self.model.get('status')._id == model.id) {
        self.setActive(view.$el);
      }
      self.$el.append(view.el);
    });
    return this;
  },
  
  setActive: function ($el) {
    $el.siblings('.btn-primary').removeClass('btn-primary').addClass('btn-default');
    $el.removeClass('btn-default').addClass('btn-primary');
  },

  statusUpdate: function (event) {
    var $el = $(event.currentTarget);
    this.model.save({
      _id: this.model.id,
      status: $el.data('id')
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
