var User = Backbone.Model.extend({

  urlRoot: 'user',
  idAttribute: '_id',
  fetched: false,

  initialize: function () {
    this.once('sync', function () {
      this.fetched = true;
    }, this);
    this.on('error', function () {
      this.fetched = true;
      asapp.redirect('#login');
    });
  },

  validate: function (attrs, options) {
    if (attrs.username && attrs.username.trim().length < 3) {
      return 'invalid username';
    }
  },

  isFetched: function () {
    return this.fetched;
  }

});
