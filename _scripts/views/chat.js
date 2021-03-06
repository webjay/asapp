var ChatView = Backbone.View.extend({

  el: '#chat',
  
  request_id: null,

  events: {
    'change #chatmsg': 'modelSet',
    'submit form': 'submit',
    'click .btn-chat': 'chat_focus'
  },

  initialize: function () {
    this.$content = this.$('.messages');
    this.listenTo(this.collection, 'add', this.append);
    this.listenTo(this.model, 'invalid', function () {
      $('#chatmsg').closest('.form-group').addClass('has-error');
      $('#chatmsg').one('keydown', function () {
        $('#chatmsg').closest('.form-group').removeClass('has-error');
      });
    });
  },
  
  render_request: function (request_id) {
    var model = asapp.requests.get(request_id);
    var view = new RequestView({
      model: model
    }).render();
    this.$('.request').html(view.el);
  },

  render: function () {
    this.request_model = asapp.requests.get(this.request_id);
    this.listenTo(this.request_model, 'change:open', function () {
      this.form_disabled(!this.request_model.get('open'));
    });
    this.$('.msg').remove();
    this.render_request(this.request_id);
    var messages = this.collection.where({
      request: this.request_id
    });
    _.each(messages, this.append, this);
    this.form_disabled(!this.request_model.get('open'));
    if (this.request_model.get('open') !== false) {
      this.chat_focus();
    }
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
      view.$el.addClass('list-group-item-warning');
      view.listenToOnce(model, 'sync', function () {
        view.$el.removeClass('list-group-item-warning');
      });
    }
    this.$content.find('.list-group-item:last-child').before(view.el);
  },
  
  chat_focus: function () {
    setTimeout(function () {
      $('#chatmsg').focus();
    }, 0);
  },
  
  form_disabled: function (disabled) {
    this.$('form').find('input,button').prop('disabled', disabled);
  },

  modelSet: function () {
    this.model.set('text', this.$('#chatmsg').val());
    this.model.set('request', this.request_id);
  },

  submit: function (event) {
    event.preventDefault();
    this.modelSet();
    if (this.model.isValid()) {
      this.collection.create(this.model.toJSON());
      this.$('#chatmsg').val('');
    }
  }

});
