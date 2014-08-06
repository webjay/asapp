var RequestView = Backbone.View.extend({

  tagName: 'div',
  className: 'thumbnail',
  template: JST['_templates/request.hjs'],
  
  events: {
    // 'click button.wilco': 'wilco',
    // 'click button.star': 'star',
    // 'click .statuses': 'set_status'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var data = this.model.toJSON();
    if (this.model.isNew()) {
      data._id = 0;
      data.created = new Date;
    }
    this.$el.html(this.template(data));
    var statusesView = new StatusesView({
      model: this.model
    });
    this.$('.statuses').html(statusesView.render().el);
    this.$('.selectpicker').selectpicker();
    if (this.model.user_wilco()) {
      this.$('.wilco').addClass('active');
    }
    var owner = this.model.get('owner');
    if (owner && owner._id === asapp.user.id) {
      this.$('.star').addClass('active');
    }
    return this;
  },
  
  // set_status: function (event) {
  //   event.preventDefault();
  //   var $el = $(event.currentTarget);
  //   var action = $el.data('action');
  //   console.log(action);
  // },
  //
  // wilco: function () {
  //   this.model.save({
  //     wilco_set: this.model.user_wilco()
  //   }, {
  //     patch: true,
  //     wait: true
  //   });
  // },
  //
  // star: function () {
  //   this.model.save({
  //     owner: asapp.user.id
  //   }, {
  //     patch: true,
  //     wait: true
  //   });
  // }

});
