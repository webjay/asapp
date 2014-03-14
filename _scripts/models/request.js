var Request = Backbone.Model.extend({

  idAttribute: '_id',
  url: '/request',

  defaults: {
    user: {
      username: null
    },
    created: new Date,
    description: null,
    type: {
      name: null
    },
    location: {
      name: null
    }
  },

  initialize: function () {
    // this.on('change', function () {
    //   this.save();
    // }, this);
    this.on('add', function () {
      this.save();
    }, this);
  }

});
