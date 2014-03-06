var ProfileView = Backbone.View.extend({
  
  el: '#form-profile',

  render: function(){

    var form = new Backbone.Form({
      model: asapp.user
    }).render();
    
    form.$el.append('<input type="submit" value="Save">');

    this.$el.html(form.el);

    form.$el.submit(function (event) {
      event.preventDefault();
      var err = form.commit({
        validate: true
      });
      if (err) {
        // console.error(err);
      } else {
        console.log(asapp.user.attributes);
      }
    });

    return this;

  }

});
