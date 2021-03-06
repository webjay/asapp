var StatusesView = Backbone.View.extend({

  tagName: 'select',
  className: 'selectpicker',
  attributes: {
    'data-width': 'auto',
    'data-mobile': 'true'
  },

  events: {
    'change': 'statusUpdate'
  },

  render: function () {
    var view = new Backbone.View({
      tagName: 'option',
      attributes: {
        'data-content': '<span class="glyphicon glyphicon-cog"></span>'
      }
    }).render();
    this.$el.append(view.el);
    if (this.model.get('urgent')) {
      var statuses = asapp.statuses.where({
        urgent: true
      });
    } else {
      var statuses = asapp.statuses.where({
        fyi: true
      });
    }
    var owner = this.model.get('owner');
    _.each(statuses, function (status) {
      var view = new Backbone.View({
        tagName: 'option',
        attributes: {
          value: status.id
        }
      }).render();
      var name = status.get('name');
      if (owner && status.get('action') === 'owner') {
        name = owner.username + ' is owner';
      }
      view.$el.html(name);
      this.$el.append(view.el);
    }, this);
    if (owner) {
      var selected = this.model.get('status')._id;
      this.$('option[value=' + selected + ']').attr('selected', 'selected');
    }
    // $('.selectpicker').selectpicker();
    return this;
  },

  statusUpdate: function (event) {
    event.preventDefault();
    var $el = $(event.currentTarget);
    var status = asapp.statuses.get($el.val());
    var action = status.get('action');
    switch (action) {
      case 'owner':
        this.star();
        break;
      case 'wilco':
        this.wilco();
        break;
    }
    this.model.save({
      _id: this.model.id,
      status: $el.val()
    }, {
      patch: true,
      validate: false
    });
  },
  
  wilco: function () {
    this.model.save({
      wilco_set: this.model.user_wilco()
    }, {
      patch: true,
      wait: true
    });
  },

  star: function () {
    this.model.save({
      owner: asapp.user.id
    }, {
      patch: true,
      wait: true
    });
  }

});
