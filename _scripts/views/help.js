var HelpView = Backbone.View.extend({

  el: '#help',

  events: {
    'click button': 'modelSet',
    'submit form': 'submit'
  },

  initialize: function () {
    this.listenTo(asapp.groups, 'sync', this.render);
    this.listenTo(asapp.locations, 'sync', this.render);
    this.listenTo(this.model, 'invalid', function () {
      this.$(this.model.validationError.select + ' .help-block span').html(this.model.validationError.msg);
    });
  },

  render: function () {
    var self = this;
    this.$('textarea').val('');
    var user_follow = asapp.user.get('follow');
    var groups = asapp.groups.filter(function (group) {
      return user_follow.groups.indexOf(group.id) !== -1;
    });
    this.render_groups(groups);
    var view = this.showAllButton(function () {
      self.render_groups(asapp.groups.models);
    });
    this.$('#request-groups > div').append(view.el);
    var locations = asapp.locations.filter(function (location) {
      return user_follow.locations.indexOf(location.id) !== -1;
    });
    this.render_locations(locations);
    var view = this.showAllButton(function () {
      self.render_locations(asapp.locations.models);
    });
    this.$('#request-locations > div').append(view.el);
    return this;
  },
  
  render_groups: function (groups) {
    this.$('#request-groups > div').empty();
    _.each(groups, function (model) {
      var view = new GroupView({
        model: model
      }).render();
      this.$('#request-groups > div').append(view.el);
    });
  },
  
  render_locations: function (locations) {
    this.$('#request-locations > div').empty();
    _.each(locations, function (model) {
      var view = new LocationView({
        model: model
      }).render();
      this.$('#request-locations > div').append(view.el);
    });
  },

  showAllButton: function (callback) {
    var view = new Backbone.View({
      tagName: 'button',
      className: 'btn btn-default showall',
      attributes: {
        type: 'button'
      },
      events: {
        'click': callback
      }
    });
    view.$el.html('<span class="glyphicon glyphicon-plus"></span>');
    return view.render();
  },
  
  modelSet: function (event) {
    if (event) {
      var $el = $(event.currentTarget);
      if ($el.attr('name') == 'urgent') {
        this.model.set('urgent', $el.attr('value'));
      } else {
        this.model.set('urgent', false);
      }
    }
    this.model.set(this.$('form').serializeObject());
  },

  submit: function (event) {
    event.preventDefault();
    this.modelSet();
    if (this.model.isValid()) {
      this.collection.create(this.model.toJSON(), {
        wait: true
      });
      this.$('textarea').val('');
      asapp.redirect('monitor');
    }
  }

});
