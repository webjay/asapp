var SettingsProfileView = Backbone.View.extend({

  el: '#settings_profile',

  events: {
    'submit': 'submit',
  },
  
  submit: function (event) {
    event.preventDefault();
    asapp.user.save({
      mobile: this.$('#mobile').val()
    }, {
      patch: true
    });
  }

});
