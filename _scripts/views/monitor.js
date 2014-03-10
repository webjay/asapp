var MonitorView = Backbone.View.extend({

  tagName: 'tr',
  template: _.template('<td><%- new Date(created).toLocaleDateString() %> <%- new Date(created).toLocaleTimeString() %></td><td><%- location.name %></td><td><%- user.username %></td><td><%- type.name %></td><td><%- description %></td><td><%- status.name %></td>'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
