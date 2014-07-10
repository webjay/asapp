var StatusesView = Backbone.View.extend({

  tagName: 'div',
  className: 'btn-group btn-group-xs',
  template: JST['_templates/statuses.hjs'],

  events: {
    'click a': 'statusUpdate',
  },

  render: function () {
    var status_name = '';
    if (this.model.get('status')) {
      status_name = this.model.get('status').name;
    }
    var data = {
      status: status_name,
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
