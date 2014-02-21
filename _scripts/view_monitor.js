var MonitorView = Backbone.View.extend({
  
  tagName: 'tr',
  template: _.template('<th>09:25</th><td><%- location %></td><td><%- name %></td><td><%- problem %></td><td><%- description %></td><td></td>'),

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
