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

  initialize: function () {
    this.on('invalid', function () {
      console.error(this.validationError);
    });
  },

  validate: function (attrs, options) {
    if (!attrs.type) {
      return 'Type must be set';
    }
    if (!attrs.location) {
      return 'Location must be set';
    }
  }

});
