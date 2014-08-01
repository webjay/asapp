var LocationView = Backbone.View.extend({

  tagName: 'label',
  className: 'btn btn-default',
  template: JST['_templates/radio-item.hjs'],

  initialize: function () {
    if (this.className == 'checkbox-inline') {
      this.template = JST['_templates/checkbox.hjs'];
    }
  },

  render: function () {
    var data = this.model.toJSON();
    data.fieldName = 'location';
    this.$el.html(this.template(data));
    return this;
  },

});
