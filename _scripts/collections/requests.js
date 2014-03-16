
var Requests = Backbone.Collection.extend({

  model: Request,
  url: '/requests',

  comparator: function (model) {
    var date = new Date(model.get('created'));
    return -date.getTime();
  }

});
