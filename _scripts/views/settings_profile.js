var SettingsProfileView = Backbone.View.extend({

  el: '#settings_profile',

  events: {
    'submit': 'submit',
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  
  render: function () {
    this.$('#mobile').val(this.model.get('mobile'));
    return this;
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
