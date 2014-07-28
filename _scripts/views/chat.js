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
  
  render_request: function (request_id) {
    var model = asapp.requests.get(request_id);
    if (model) {
      var view = new RequestView({
        model: model
      }).render();
      this.$('.request').html(view.el);
    } else {
      this.listenToOnce(asapp.requests, 'sync', function () {
        this.render_request(request_id);
      });
    }
  },

  render_wilcos: function (request_id) {
    var model = asapp.requests.get(request_id);
    if (model) {
      if (model.get('urgent')) {
        this.$('.panel.wilco').removeClass('panel-success');
        this.$('.panel.wilco').addClass('panel-default');
      }
      var view = new WilcosView({
        model: model
      }).render();
      this.$('.wilcos').html(view.el);
    } else {
      this.listenToOnce(asapp.requests, 'sync', function () {
        this.render_wilcos(request_id);
      });
    }
  },

  render: function () {
    this.$tbody.empty();
    var messages = [];
    if (this.request_id) {
      this.render_request(this.request_id);
      this.render_wilcos(this.request_id);
      messages = this.collection.where({
        request: this.request_id
      });
    } else {
      this.$('.request').empty();
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
        view.$el.removeClass('warning');
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
      this.collection.create(this.model);
      this.$('#chatmsg').val('');
      this.model = new this.collection.model;
    }
  }

});
