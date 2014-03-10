var User = Backbone.Model.extend({

  // schema: {
  //   name: {
  //     validators: ['required']
  //   },
  //   email: {
  //     dataType: 'email',
  //     validators: ['required', 'email']
  //   },
  //   phone: {
  //     dataType: 'tel'
  //   },
  //   role: {
  //     type: 'Select',
  //     options: new Roles()
  //   }
  // },

  schema: {
    username: {
      validators: ['required']
    }
  },

  urlRoot: 'user',
  idAttribute: '_id',
  synced: false,

  initialize: function () {
    var self = this;
    // get user from backend
    this.fetch({
      success: function (model) {
        self.set(model.attributes);
        self.synced = true;
      },
      error: function () {
        self.synced = true;
        asapp.redirect('#login');
      }
    });
  },

  isSynced: function () {
    return this.synced;
  },

  login: function (callback) {
    var self = this;
    this.save(null, {
      success: function (model) {
        if (model.id) {
          self.set(model.attributes);
          callback();
        } else {
          callback('login failed');
        }
      },
      error: function () {
        console.error('login error');
      }
    });
  }

});
