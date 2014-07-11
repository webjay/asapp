var Message = Backbone.Model.extend({

  idAttribute: '_id',
  url: '/message',
  
  defaults: {
    user: {
      username: null
    },
    created: new Date,
    text: null
  },

  initialize: function () {
    this.on('invalid', function () {
      console.error(this.validationError);
    });
  },

  validate: function (attrs, options) {
    if (_.isEmpty(attrs.text)) {
      return 'Message must be set';
    }
  }

});
