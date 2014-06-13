
var Messages = Backbone.Collection.extend({

  model: Message,
  url: '/messages',

  comparator: function (model) {
    var date = new Date(model.get('created'));
    return date.getTime();
  }

});
