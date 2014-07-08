var StatusesView = Backbone.View.extend({

  tagName: 'div',
  className: 'btn-group btn-group-sm',
  template: JST['_templates/statuses.hjs'],

  events: {
    'click a': 'statusUpdate',
  },

  render: function () {
    var data = {
      status: this.model.get('status').name,
      statuses: asapp.statuses.toJSON()
    };
    this.$el.html(this.template(data));
    return this;
  },

  statusUpdate: function (event) {
    event.preventDefault();
    var $el = $(event.currentTarget);
    this.model.save({
      _id: this.model.id,
      status: $el.data('id')
    }, {
      patch: true,
      validate: false
    });
  }

});
