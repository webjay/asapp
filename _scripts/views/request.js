var RequestView = Backbone.View.extend({

  tagName: 'tr',
  template: JST['_templates/request.hjs'],

  events: {
    'click a.gotoChat': 'setSubject',
  },
  
  attributes: function () {
    return {
      id: 'request-' + this.model.id
    }
  },

  className: function () {
    return this.model.get('urgent') ? 'danger' : '';
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    console.log(this.model.attributes);
    this.$el.html(this.template(this.model.attributes));
    var statusesView = new StatusesView({
      model: this.model
    });
    statusesView.render();
    this.$('.statuses').html(statusesView.el);
    return this;
  },
  
  setSubject: function (e) {
    var parent = $(e.currentTarget).closest('tr');
    var el_id = parent.attr('id');
    var subj = '<tr><td colspan="3"><small>Subject is now on ' + el_id + '</small></td></tr>';
    $('#chat tbody').append(subj);
  }

});
