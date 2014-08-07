var Request = Backbone.Model.extend({

  idAttribute: '_id',
  
  defaults: {
    user: {
      username: null
    },
    owner: null,
    wilco: []
  },

  validate: function (attrs, options) {
    if (!attrs.group) {
      return {
        select: '#request-groups',
        msg: 'Group must be set'
      };
    }
    if (!attrs.location) {
      return {
        select: '#request-locations',
        msg: 'Location must be set'
      };
    }
  },
  
  user_is_owner: function () {
    var owner = this.get('owner');
    if (owner && owner._id === asapp.user.id) {
      return true;
    }
    return false;
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
