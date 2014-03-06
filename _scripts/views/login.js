var LoginView = Backbone.View.extend({

  el: '#page-login',

  render: function(){

    var form = new Backbone.Form({
      model: asapp.user
    }).render();

    form.$el.append('<input type="submit" value="Login">');

    this.$el.find('.bbform').html(form.el);

    form.$el.submit(function (event) {
      event.preventDefault();
      var err = form.commit({
        validate: true
      });
      if (err) {
        console.error(err);
      } else {
        asapp.user.login(function (err) {
          if (err) {
            console.error(err);
            return;
          }
          asapp.redirect('request.html');
        });
      }
    });

    return this;

  }

});
