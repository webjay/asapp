var LocationView = Backbone.View.extend({

  tagName: 'label',
  template: JST['_templates/radio-item.jst'],

  attributes: function () {
    return {
      for: 'radio-' + this.model.cid
    }
  },

  render: function () {
    var data = this.model.attributes;
    data.cid = this.model.cid;
    data.fieldName = 'location';
    this.$el.html(this.template(data));
    return this;
  },

});
