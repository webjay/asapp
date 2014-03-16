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

  // initialize: function () {
  //   // this.set({
  //   //   status: asapp.statuses.at(0)
  //   // });
  // }

});
