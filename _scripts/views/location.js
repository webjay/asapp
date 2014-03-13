var LocationView = Backbone.View.extend({

  tagName: 'label',
  template: JST['_templates/radio-item.jst'],

  render: function () {
    var data = this.model.attributes;
    data.fieldName = 'location';
    this.$el.html(this.template(data));
    return this;
  },

});
