var LocationView = Backbone.View.extend({

  tagName: 'label',
  className: 'radio-inline',
  template: JST['_templates/radio-item.hjs'],

  render: function () {
    var data = this.model.attributes;
    data.fieldName = 'location';
    this.$el.html(this.template(data));
    return this;
  },

});
