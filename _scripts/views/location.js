var LocationView = Backbone.View.extend({

  tagName: 'label',
  template: JST['_templates/radio-item.hjs'],

  render: function () {
    var data = this.model.attributes;
    data.uid = this.attributes.for;
    data.fieldName = 'location';
    this.$el.html(this.template(data));
    return this;
  },

});
