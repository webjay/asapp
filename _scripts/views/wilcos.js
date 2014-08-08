var WilcosView = Backbone.View.extend({

  template: JST['_templates/wilcos.hjs'],

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var wilcos = this.model.get('wilco');
    if (!wilcos) {
      return this;
    }
    var usernames = wilcos.map(function (wilco) {
      return wilco.username;
    });
    this.$el.html(this.template({
      usernames: usernames
    }));
    return this;
  }

});
