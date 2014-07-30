var SettingsProfileView = Backbone.View.extend({

  el: '#settings_profile',

  events: {
    'submit': 'submit',
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  
  render: function () {
    this.$('[name="username"]').val(this.model.get('username'));
    this.$('[name="mobile"]').val(this.model.get('mobile'));
    var notifications = this.model.get('notifications');
    var follow = asapp.user.get('follow');
    if (notifications && notifications.sms) {
      this.$('[name="sms"]').prop('checked', true);
    }
    this.$('.groups').remove('label');
    asapp.groups.each(function (model) {
      var view = new GroupView({
        model: model,
        className: 'checkbox-inline'
      }).render();
      if (follow.groups.indexOf(model.id) !== -1) {
        view.$('input').prop('checked', true);
      }
      this.$('.groups').append(view.el);
    }, this);
    this.$('.locations').remove('label');
    asapp.locations.each(function (model) {
      var view = new LocationView({
        model: model,
        className: 'checkbox-inline'
      }).render();
      if (follow.locations.indexOf(model.id) !== -1) {
        view.$('input').prop('checked', true);
      }
      this.$('.locations').append(view.el);
    }, this);
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    var locations = [];
    this.$('[name="location"]').each(function () {
      if ($(this).is(':checked')) {
        locations.push($(this).val());
      }
    });
    var groups = [];
    this.$('[name="group"]').each(function () {
      if ($(this).is(':checked')) {
        groups.push($(this).val());
      }
    });
    asapp.user.save({
      mobile: this.$('[name="mobile"]').val(),
      notifications: {
        sms: this.$('[name="sms"]').is(':checked')
      },
      follow: {
        locations: locations,
        groups: groups
      }
    }, {
      patch: true
    });
  }

});
