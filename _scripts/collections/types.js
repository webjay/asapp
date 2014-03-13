
var Types = Backbone.Collection.extend({

  model: Type,
  url: '/types',

  initialize: function () {
    this.fetch();
  }

});
