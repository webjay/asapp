var Request = Backbone.Model.extend({

  schema: {
    type: {
      type: 'Select',
      options: function (callback) {
        var types = new Types;
        types.fetch({
          success: function (coll, models) {
            callback(types);
          }
        });
      }
    },
    location: {
      type: 'Select',
      options: function (callback) {
        var locations = new Locations;
        locations.fetch({
          success: function (coll, models) {
            callback(locations);
          }
        });
      },
      validators: ['required']
    },
    description: {
      validators: ['required']
    },
    urgent: {
      type: 'Radio',
      options: {
        false: 'No',
        true: 'Yes'
      }
    },
    created: {
      type: 'Hidden'
    }
  },

  idAttribute: '_id',
  url: '/request',

  defaults: {
    user: {
      username: null
    },
    created: new Date
  },

  initialize: function () {
    // this.on('change', function () {
    //   this.save();
    // }, this);
    this.on('add', function () {
      this.save();
    }, this);
  }

});
