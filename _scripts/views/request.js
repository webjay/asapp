var RequestView = Backbone.View.extend({

  tagName: 'div',
  className: 'thumbnail',
  template: JST['_templates/request.hjs'],

  events: {
    'click a[href="#chat"]': 'setSubject',
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var data = this.model.toJSON();
    if (!data._id) {
      data._id = 0;
    }
    this.$el.html(this.template(data));
    var statusesView = new StatusesView({
      model: this.model
    });
    statusesView.render();
    this.$('.btn-toolbar').append(statusesView.el);
    return this;
  },
  
  setSubject: function () {
    var el_id = 'request-' + this.model.id
    var subj = '<tr><td colspan="3"><small>Subject is now on ' + el_id + '</small></td></tr>';
    $('#chat tbody').append(subj);
  }

});
