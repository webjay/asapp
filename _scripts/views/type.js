var TypeView = Backbone.View.extend({

  tagName: 'label',
  template: JST['_templates/radio-item.hjs'],

  attributes: function () {
    return {
      for: 'radio-' + this.model.cid
    }
  },

  render: function () {
    var data = this.model.attributes;
    data.cid = this.model.cid;
    data.fieldName = 'type';
    this.$el.html(this.template(data));
    return this;
  },

});
