var RequestView = Backbone.View.extend({

  el: '#request',

  events: {
    'submit': 'submit'
  },

  render: function () {
    // create BB form
    this.form = new Backbone.Form({
      model: this.model
    }).render();
    this.form.$el.append('<input type="submit" value="Save">');
    this.$el.find('.bbform').html(this.form.el);
    // done
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var err = this.form.commit({
      validate: true
    });
    if (err) {
      // console.error(err);
    } else {
      this.collection.add(this.model);
    }
  }

});
