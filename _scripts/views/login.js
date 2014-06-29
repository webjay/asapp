var LoginView = Backbone.View.extend({

  el: '#login',

  events: {
    'submit form': 'submit',
    'input #username': 'clearErr'
  },

  initialize: function () {
    this.listenTo(this.model, 'invalid', this.render);
    this.listenTo(this.model, 'change', function () {
      if (this.model.isValid()) {
        asapp.redirect('help');
      }
    });
  },

  render: function () {
    if (this.model.validationError) {
      this.$('.errormsg').text(this.model.validationError);
    }
    return this;
  },

  clearErr: function () {
    this.$('.errormsg').empty();
  },

  submit: function (event) {
    event.preventDefault();
    asapp.user.save({
      username: this.$('#username').val()
    });
  }

});
