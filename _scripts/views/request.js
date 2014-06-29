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
    return this.model.get('urgent') ? 'urgent' : '';
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.statusView = new StatusesView({
      model: this.model
    });
    this.statusView.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    this.$el.append(this.statusView.el);
    return this;
  },
  
  setSubject: function (e) {
    var parent = $(e.currentTarget).closest('tr');
    var el_id = parent.attr('id');
    var subj = '<tr><td colspan="3"><small>Subject is now on ' + el_id + '</small></td></tr>';
    $('#chat tbody').append(subj);
  }

});
