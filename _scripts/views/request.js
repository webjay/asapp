var RequestView = Backbone.View.extend({

  el: '#page-request',

  render: function () {

    var self = this;

    var form = new Backbone.Form({
      model: self.model
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
        self.collection.add(self.model);
      }
    });

    return this;

  }

});
