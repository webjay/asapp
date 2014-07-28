var WilcosView = Backbone.View.extend({

  template: JST['_templates/wilcos.hjs'],

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var wilcos = this.model.get('wilco');
    this.$el.empty();
    for (var i = wilcos.length - 1; i >= 0; i--) {
      this.$el.append(this.template(wilcos[i]));
    }
    return this;
  }

});
