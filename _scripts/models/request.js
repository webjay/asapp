var Request = Backbone.Model.extend({

  idAttribute: '_id',
  
  defaults: {
    user: {
      username: null
    },
    owner: null,
    wilco: []
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
  },
  
  user_wilco: function () {
    var wilcos = this.get('wilco');
    if (!wilcos) {
      return false;
    }
    for (var i = wilcos.length - 1; i >= 0; i--) {
      if (wilcos[i]._id === asapp.user.id) {
        return true;
      }
    }
    return false;
  }

});
