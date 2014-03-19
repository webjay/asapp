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
    },
    urgent: false
  },

  validate: function (attrs, options) {
    if (!_.isString(attrs.type)) {
      return 'Type must be set';
    }
    if (!_.isString(attrs.location)) {
      return 'Location must be set';
    }
  }

});
