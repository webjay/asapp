var Request = Backbone.Model.extend({

  idAttribute: '_id',
  url: '/request',
  
  defaults: {
    user: {
      username: null
    }
  },

  initialize: function () {
    this.on('invalid', function () {
      console.error(this.validationError);
    });
  },

  validate: function (attrs, options) {
    if (!attrs.group) {
      return 'Group must be set';
    }
    if (!attrs.location) {
      return 'Location must be set';
    }
  }

});
