var ChatView = Backbone.View.extend({

  el: '#chat',
  
  request_id: null,

  events: {
    'change #chatmsg': 'modelSet',
    'submit form': 'submit'
  },

  initialize: function () {
    this.$tbody = this.$('tbody');
    this.listenToOnce(this.collection, 'sync', function () {
      this.render();
      this.listenTo(this.collection, 'add', this.append);
    });
  },

  render: function () {
    this.$tbody.empty();
    var messages = [];
    if (this.request_id) {
      var request_model = asapp.requests.get(this.request_id);
      var request_view = new RequestView({
        model: request_model
      }).render();
      this.$('.request').html(request_view.el);
      messages = this.collection.where({
        request: this.request_id
      });
    } else {
      messages = this.collection.models;
    }
    _.each(messages, this.append, this);
    return this;
  },

  append: function (model) {
    if (this.request_id && model.get('request') !== this.request_id) {
      return;
    }
    var view = new MessageView({
      model: model
    }).render();
    if (model.isNew()) {
      view.$el.addClass('warning');
      view.listenToOnce(model, 'sync', function () {
        // view.$el.removeClass('warning');
      });
    }
    this.$tbody.append(view.el);
  },

  modelSet: function () {
    this.model.set(this.$('form').serializeObject());
    this.model.set('request', this.request_id);
  },

  submit: function (event) {
    event.preventDefault();
    this.modelSet();
    if (this.model.isValid()) {
      this.collection.create(this.model, {
        wait: false
      });
      this.$('#chatmsg').val('');
      this.model = new this.collection.model;
    }
  }

});
