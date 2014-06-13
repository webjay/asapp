var ChatView = Backbone.View.extend({

  el: '#chat',

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
    this.collection.each(this.append, this);
    return this;
  },

  append: function (model) {
    var view = new MessageView({
      model: model
    }).render();
    this.$tbody.append(view.el);
    $('html, body').animate({ 
      scrollTop: $('#chatmsg').offset().top + $('#chatmsg').height()
    }, 'slow');
  },

  modelSet: function () {
    this.model.set(this.$('form').serializeObject());
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
