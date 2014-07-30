var GroupView = Backbone.View.extend({

  tagName: 'label',
  className: 'radio-inline',
  template: JST['_templates/radio-item.hjs'],
  
  initialize: function () {
    if (this.className == 'checkbox-inline') {
      this.template = JST['_templates/checkbox.hjs'];
    }
  },

  render: function () {
    var data = this.model.attributes;
    data.fieldName = 'group';
    this.$el.html(this.template(data));
    return this;
  },

});
