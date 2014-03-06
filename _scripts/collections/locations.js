
var Locations = Backbone.Collection.extend({

  model: Location,
  url: '/locations',

  initialize: function () {
    this.fetch();
  }

});
