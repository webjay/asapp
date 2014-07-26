var AdminView = Backbone.View.extend({

  el: '#admin',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render_users);
    this.collection.fetch();
    this.listenTo(asapp.groups, 'sync', this.render_groups);
  },

  render_groups: function () {
    var self = this;
    this.$('#admin_groups').empty();
    asapp.groups.each(function (model) {
      var view = new Backbone.View({
        tagName: 'option',
        attributes: {
          value: model.id
        }
      }).render();
      view.$el.html(model.get('name'));
      self.$('#admin_groups').append(view.el);
    });
    return this;
  },

  render_users: function () {
    var self = this;
    this.$('#admin_users').empty();
    this.collection.each(function (model) {
      var view = new Backbone.View({
        tagName: 'option',
        attributes: {
          value: model.id
        }
      }).render();
      view.$el.html(model.get('username'));
      self.$('#admin_users').append(view.el);
    });
    return this;
  }

});
