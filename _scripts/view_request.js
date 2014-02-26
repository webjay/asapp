var RequestView = Backbone.View.extend({
  
  el: '#page-request',

  render: function(){
    
    var request = new Request();

    var form = new Backbone.Form({
      model: request
    }).render();
    
    form.$el.append('<input type="submit" value="Save">');

    this.$el.find('.bbform').html(form.el);

    form.$el.submit(function (event) {
      event.preventDefault();
      var err = form.commit({
        validate: true
      });
      if (err) {
        // console.error(err);
      } else {
        request.set('user', asapp.user.cid);
        asapp.requests.add(request);
        console.log(asapp.requests.models);
      }
    });

    return this;

  }

});
