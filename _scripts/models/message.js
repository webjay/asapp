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

  validate: function (attrs, options) {
    if (_.isEmpty(attrs.text.trim())) {
      return 'Message must be set';
    }
  }

});
